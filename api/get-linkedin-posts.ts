// API Route: GET /api/get-linkedin-posts
// Fetches LinkedIn posts from Supabase for the Blog page
// Returns array of posts ordered by date (newest first)

import { supabase } from '../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed', elements: [] });
  }

  try {
    // Debug: log environment and client state
    console.log('GET /api/get-linkedin-posts called');
    console.log('Supabase URL:', process.env.SUPABASE_URL ? '✓ set' : '✗ missing');
    console.log('Supabase Key:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✓ set (length: ' + process.env.SUPABASE_SERVICE_ROLE_KEY.length + ')' : '✗ missing');

    if (!supabase) {
      console.error('ERROR: Supabase client is null/undefined');
      return res.status(500).json({ 
        error: 'Database client not initialized',
        elements: []
      });
    }

    if (!supabase.from) {
      console.error('ERROR: Supabase client does not have .from() method');
      return res.status(500).json({ 
        error: 'Database client not properly initialized',
        elements: []
      });
    }

    console.log('Attempting to query linkedin_posts table...');

    // Fetch posts from Supabase, ordered by date (newest first)
    const { data, error } = await supabase
      .from('linkedin_posts')
      .select('*')
      .order('date', { ascending: false })
      .limit(50);

    if (error) {
      console.error('ERROR: Supabase query failed:', error);
      return res.status(500).json({
        error: 'Failed to fetch posts',
        details: error.message,
        elements: []
      });
    }

    console.log(`SUCCESS: Fetched ${data ? data.length : 0} posts from Supabase`);

    // Return posts in the expected format
    return res.status(200).json({
      elements: data || []
    });
  } catch (err) {
    console.error('ERROR: Unhandled exception in get-linkedin-posts:', err);
    return res.status(500).json({
      error: 'Internal server error',
      details: (err as any)?.message || 'Unknown error',
      elements: []
    });
  }
}
