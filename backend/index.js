const { createClient } = require('@supabase/supabase-js');
// Load environment variables from .env file
require('dotenv').config();

const privateKey = process.env.VITE_SUPABSE_ANON_KEY;
const VITE_SUPABSE_URL = 'https://tutnizjkuflqechjvxoo.supabase.co'
const supabase = createClient(supabaseUrl, supabaseKey);
