#!/usr/bin/env node

/**
 * Test script to validate your full Zapier → Supabase → Blog integration
 * 
 * This script:
 * 1. Sends a test post to your Zapier webhook
 * 2. Waits a moment for processing
 * 3. Fetches posts from your API
 * 4. Verifies the test post appears
 * 
 * Usage:
 *   npm run test:zapier
 *   or
 *   node scripts/test-zapier-integration.js
 */

const https = require('https');
const http = require('http');

// Configuration
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/26348175/ue3r9rd/';
const API_ENDPOINT = process.env.API_URL || 'http://localhost:5173/api/get-linkedin-posts';

const testPost = {
  text: `🧪 Integration test from ${new Date().toLocaleString()} - if you see this, it worked!`,
  date: new Date().toISOString(),
  url: `https://linkedin.com/test/${Date.now()}`,
  image: null,
  video: null
};

let testPostUrl = testPost.url;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sendToZapier() {
  return new Promise((resolve, reject) => {
    console.log('1️⃣  Sending test post to Zapier webhook...');
    
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
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('   ✅ Zapier received the post (status', res.statusCode + ')');
          resolve();
        } else {
          console.log('   ⚠️  Zapier returned status', res.statusCode);
          resolve();
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

function fetchPosts() {
  return new Promise((resolve, reject) => {
    console.log('2️⃣  Fetching posts from API (' + API_ENDPOINT + ')...');
    
    const client = API_ENDPOINT.startsWith('https') ? https : http;
    const url = new URL(API_ENDPOINT);
    
    const options = {
      hostname: url.hostname,
      port: url.port,
      pathname: url.pathname + url.search,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };

    const req = client.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.elements || []);
        } catch (e) {
          reject(new Error('Failed to parse API response: ' + e.message));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function run() {
  try {
    console.log('🚀 Starting Zapier Integration Test');
    console.log('====================================\n');

    // Step 1: Send to Zapier
    await sendToZapier();
    
    // Step 2: Wait for Zapier to process
    console.log('3️⃣  Waiting 3 seconds for Zapier to process...');
    await delay(3000);
    
    // Step 3: Fetch posts
    const posts = await fetchPosts();
    console.log('   ✅ Fetched ' + posts.length + ' posts from API');
    
    // Step 4: Check if test post is there
    console.log('4️⃣  Checking if test post appears in feed...');
    const found = posts.some(p => p.url === testPostUrl);
    
    if (found) {
      console.log('   ✅ SUCCESS! Test post found in Supabase and API');
      console.log('\n✨ Your Zapier + Supabase + Blog integration is working!\n');
      console.log('Next steps:');
      console.log('- Publish a real post on LinkedIn');
      console.log('- Zapier will capture it and send to your webhook');
      console.log('- It should appear on your Blog page within seconds\n');
    } else {
      console.log('   ⚠️  Test post not yet found in database');
      console.log('\nPossible issues:');
      console.log('- Zapier is still processing (wait a few more seconds)');
      console.log('- Supabase credentials not configured (.env.local)');
      console.log('- API endpoint URL is incorrect');
      console.log('- Supabase table not created yet\n');
      console.log('Check the ZAPIER_SUPABASE_SETUP.md for troubleshooting.\n');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

run();
