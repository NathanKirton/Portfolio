// API Route: GET /api/get-linkedin-posts
// Fetches LinkedIn posts from Supabase for the Blog page
// Returns array of posts ordered by date (newest first)

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed', elements: [] });
  }

  try {
    // Lazy-create Supabase client to avoid module-level import issues during bundling
    console.log('GET /api/get-linkedin-posts called');
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

    console.log('Supabase URL present:', !!supabaseUrl);
    console.log('Supabase Key present:', !!supabaseKey);

    if (!supabaseUrl || !supabaseKey) {
      console.error('ERROR: Missing Supabase credentials in environment');
      return res.status(500).json({ error: 'Database credentials missing', elements: [] });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

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
