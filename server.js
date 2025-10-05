require('dotenv').config();  // Load .env

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing Supabase env vars - check .env file');
  process.exit(1);
}


const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3001;  // Use 3001 locally, auto-detects on Vercel

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));  // Allow React dev server; restrict in prod
app.use(express.json());  // Parse JSON bodies


const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// DELETE /api/delete-user endpoint
app.post('/api/delete-user', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    // Step 1: Delete related data from custom tables (e.g., 'profiles' - adjust table name)
    const { error: profileError } = await supabaseAdmin
      .from('profiles')  // Replace with your table name (e.g., 'users', 'accounts')
      .delete()
      .eq('id', userId);  // Assumes 'id' column matches auth.users.id (UUID)
    if (profileError) {
      console.error('Error deleting profile data:', profileError);
      // Optional: Don't fail the whole deletion if this errors (e.g., no custom data)
    }

    // Step 2: Delete the user from auth.users
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser (userId);
    if (deleteError) {
      throw new Error(`Failed to delete user: ${deleteError.message}`);
    }

    console.log(`User  ${userId} deleted successfully.`);
    res.json({ message: 'User  deleted successfully' });
  } catch (error) {
    console.error('Error in delete-user endpoint:', error);
    res.status(500).json({ error: error.message });
  }
});

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
