// API Route: GET /api/get-linkedin-posts
// Fetches all LinkedIn posts from Supabase, ordered by date descending

import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data, error } = await supabase
      .from('linkedin_posts')
      .select('*')
      .order('date', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to fetch posts', details: error.message });
    }

    return res.status(200).json({ elements: data || [] });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
