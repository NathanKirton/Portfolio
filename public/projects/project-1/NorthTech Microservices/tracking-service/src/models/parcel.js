const mongoose = require('mongoose');

const parcelSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Parcel', parcelSchema);
