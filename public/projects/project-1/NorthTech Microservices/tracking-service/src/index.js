const express = require('express');
const mongoose = require('mongoose');
const amqplib = require('amqplib');
const { from, lastValueFrom } = require('rxjs');
const { retry } = require('rxjs/operators');
const client = require('prom-client');
const logger = require('./logger');
const path = require('path');

const Parcel = require('./models/parcel');

const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017/tracking';
const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@rabbitmq:5672';
const QUEUE = 'tracking_updates';

// Prometheus metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });
const updatesCounter = new client.Counter({ name: 'tracking_updates_db_total', help: 'Number of DB updates', registers: [register] });
const publishesCounter = new client.Counter({ name: 'tracking_publishes_total', help: 'Number of publishes to RabbitMQ', registers: [register] });
const consumedCounter = new client.Counter({ name: 'tracking_consumed_total', help: 'Number of consumed messages', registers: [register] });

async function connectMongo() {
  logger.info('Connecting to MongoDB...', { url: MONGO_URL });
  try {
    await lastValueFrom(from(mongoose.connect(MONGO_URL)).pipe(retry(3)));
    logger.info('Connected to MongoDB');
  } catch (err) {
    logger.error('Failed to connect to MongoDB after retries', { error: err.message });
    throw err;
  }
}

async function connectRabbit() {
  logger.info('Connecting to RabbitMQ...', { url: RABBITMQ_URL });
  try {
    const conn = await lastValueFrom(from(amqplib.connect(RABBITMQ_URL)).pipe(retry(3)));
    logger.info('Connected to RabbitMQ');
    const channel = await conn.createChannel();
    await channel.assertQueue(QUEUE, { durable: true });
    return { conn, channel };
  } catch (err) {
    logger.error('Failed to connect to RabbitMQ after retries', { error: err.message });
    throw err;
  }
}

async function start() {
  await connectMongo();
  const { conn, channel } = await connectRabbit();

  // Consume messages and log them
  await channel.consume(QUEUE, async (msg) => {
    if (!msg) return;
    try {
      const payload = JSON.parse(msg.content.toString());
      // Persist consumed messages into MongoDB so publish -> queue -> consumer writes DB
      logger.info('Consumed message from queue', { payload });
      try {
        const up = Parcel.findOneAndUpdate(
          { trackingId: payload.trackingId },
          { status: payload.status, updatedAt: payload.updatedAt ? new Date(payload.updatedAt) : new Date() },
          { upsert: true, new: true }
        ).exec();
        await lastValueFrom(from(up).pipe(retry(3)));
        updatesCounter.inc();
        logger.info('Consumed message persisted to DB', { trackingId: payload.trackingId });
      } catch (dbErr) {
        logger.error('Failed to persist consumed message', { error: dbErr.message });
      }
      consumedCounter.inc();
    } catch (err) {
      logger.error('Failed to process message', { error: err.message });
    } finally {
      channel.ack(msg);
    }
  });

  const app = express();
  app.use(express.json());

  app.use(express.static('public'));

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

  // Serve the GUI on root
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

  app.post('/update', async (req, res) => {
    const { trackingId, status } = req.body || {};
    if (!trackingId || !status) return res.status(400).json({ error: 'trackingId and status required' });
    try {
      const op = Parcel.findOneAndUpdate({ trackingId }, { status, updatedAt: new Date() }, { upsert: true, new: true }).exec();
      const saved = await lastValueFrom(from(op).pipe(retry(3)));
      updatesCounter.inc();
      logger.info('Parcel updated', { trackingId, status });
      return res.json(saved);
    } catch (err) {
      logger.error('Failed to update parcel', { error: err.message });
      return res.status(500).json({ error: 'failed to update parcel' });
    }
  });

  app.post('/publish', async (req, res) => {
    const { trackingId, status } = req.body || {};
    if (!trackingId || !status) return res.status(400).json({ error: 'trackingId and status required' });
    const msg = { trackingId, status, updatedAt: new Date() };
    try {
      const publishOp = (async () => channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(msg)), { persistent: true }))();
      await lastValueFrom(from(publishOp).pipe(retry(3)));
      publishesCounter.inc();
      logger.info('Published message to queue', { msg });
      return res.json({ published: true });
    } catch (err) {
      logger.error('Failed to publish message', { error: err.message });
      return res.status(500).json({ error: 'failed to publish' });
    }
  });

  app.get('/parcel/:trackingId', async (req, res) => {
    const { trackingId } = req.params;
    if (!trackingId) return res.status(400).json({ error: 'trackingId required' });
    try {
      const parcel = await Parcel.findOne({ trackingId }).exec();
      if (!parcel) return res.status(404).json({ error: 'parcel not found' });
      logger.info('Parcel retrieved', { trackingId });
      return res.json(parcel);
    } catch (err) {
      logger.error('Failed to retrieve parcel', { error: err.message });
      return res.status(500).json({ error: 'failed to retrieve parcel' });
    }
  });

  // Return all parcels
  app.get('/parcels', async (req, res) => {
    try {
      const parcels = await Parcel.find({}).sort({ updatedAt: -1 }).exec();
      return res.json(parcels);
    } catch (err) {
      logger.error('Failed to fetch parcels', { error: err.message });
      return res.status(500).json({ error: 'failed to fetch parcels' });
    }
  });

  app.get('/metrics', async (req, res) => {
    try {
      res.set('Content-Type', register.contentType);
      res.end(await register.metrics());
    } catch (err) {
      res.status(500).end(err.message);
    }
  });

  app.listen(PORT, () => {
    logger.info(`tracking-service listening on port ${PORT}`);
  });

  // handle process signals
  process.on('SIGINT', async () => {
    logger.info('Shutting down...');
    try { await channel.close(); } catch (e) {}
    try { await conn.close(); } catch (e) {}
    process.exit(0);
  });
}

start().catch(err => {
  logger.error('Service failed to start', { error: err.message });
  process.exit(1);
});
