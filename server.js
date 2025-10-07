require('dotenv').config();

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
const PORT = process.env.PORT || 3001;  

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));  
app.use(express.json());  


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

    const { error: profileError } = await supabaseAdmin
      .from('profiles')  
      .delete()
      .eq('id', userId);  
    if (profileError) {
      console.error('Error deleting profile data:', profileError);
    }

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
