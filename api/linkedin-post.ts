// API Route: POST /api/linkedin-post
// Receives posts from Zapier and stores in Supabase
// Usage: POST to this endpoint with Zapier integration
// Header required: x-api-key matching ZAPIER_SECRET

import { supabase } from '../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate API key from header
  const apiKey = req.headers['x-api-key'];
  const expectedSecret = process.env.VITE_ZAPIER_SECRET || process.env.ZAPIER_SECRET;

  if (!apiKey || apiKey !== expectedSecret) {
    return res.status(401).json({ error: 'Unauthorized: invalid or missing x-api-key header' });
  }

  const { text, date, url, image, video } = req.body;

  // Validate required fields
  if (!text || !date || !url) {
    return res.status(400).json({ error: 'Missing required fields: text, date, url' });
  }

  try {
    // Upsert to handle duplicates (unique constraint on url)
    const { data, error } = await supabase.from('linkedin_posts').upsert(
      {
        text,
        date: new Date(date).toISOString(),
        url,
        image: image || null,
        video: video || null,
      },
      { onConflict: 'url' } // Use url as unique identifier
    );

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to store post', details: error.message });
    }

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
