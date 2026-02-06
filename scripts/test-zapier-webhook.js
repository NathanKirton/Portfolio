#!/usr/bin/env node

/**
 * Test script to validate Zapier webhook integration
 * 
 * Usage:
 *   node scripts/test-zapier-webhook.js
 * 
 * This sends a test post to your Zapier webhook URL to verify
 * the end-to-end flow works: Zapier → API → Supabase
 */

const https = require('https');

// Configuration
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/26348175/ue3r9rd/';

// Test post data
const testPost = {
  text: 'Test post from webhook validation script - ' + new Date().toISOString(),
  date: new Date().toISOString(),
  url: 'https://linkedin.com/feed/update/test-' + Date.now(),
  image: 'https://via.placeholder.com/600x400?text=Test+Image',
  video: null
};

console.log('🧪 Testing Zapier webhook integration...');
console.log('Webhook URL:', ZAPIER_WEBHOOK_URL);
console.log('Test post:', JSON.stringify(testPost, null, 2));
console.log('');

// Send POST to Zapier
const postData = JSON.stringify(testPost);

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

const req = https.request(ZAPIER_WEBHOOK_URL, options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(`✅ Webhook response: ${res.statusCode}`);
    if (data) {
      try {
        console.log('Response data:', JSON.stringify(JSON.parse(data), null, 2));
      } catch (e) {
        console.log('Response:', data);
      }
    }
    console.log('');
    console.log('📋 Next steps:');
    console.log('1. Check your Zapier dashboard for activity logs');
    console.log('2. Verify the test post appears in your Supabase linkedin_posts table');
    console.log('3. Check your Blog page - the post should appear as a card');
    console.log('');
    console.log('If the post appears, your integration is working! 🎉');
  });
});

req.on('error', (error) => {
  console.error('❌ Error sending webhook:', error.message);
  process.exit(1);
});

req.write(postData);
req.end();
