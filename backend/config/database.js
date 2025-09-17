import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
