import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

let _supabase: SupabaseClient | null = null;

if (!supabaseUrl || !supabaseServiceKey) {
  // Don't attempt to create the client at module load time if credentials are missing.
  // Creating the client with invalid/empty values can throw in some runtime environments
  // and will prevent the serverless function from loading entirely.
  console.warn('Supabase credentials not configured. Posts will not load.');
} else {
  try {
    _supabase = createClient(supabaseUrl, supabaseServiceKey);
  } catch (err) {
    console.error('Failed to create Supabase client:', err);
    _supabase = null;
  }
}

export const supabase = _supabase;
