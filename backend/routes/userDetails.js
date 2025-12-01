import express from 'express';
import { supabase } from '../supabase/index.js';
import { verifyUserFromToken } from '../utils/verifyUser.js';

const router = express.Router();

// Get user profile API
router.get('/', async (req, res) => {
  try {
    const user = await verifyUserFromToken(req);
    if (!user) {
      return res.status(401).json({ status: 401, success: false, message: 'Unauthorized' });
    }

    let { data: profile, error: fetchError } = await supabase.from('user_profiles').select('*').eq('id', user?.id).maybeSingle();

    // checking db errors
    if (fetchError) {
      return res.status(fetchError?.status).json({ status: fetchError?.status, success: false, message: 'Database Fetch Error' });
    }

    // extract names
    const fullName = user?.user_metadata?.full_name || '';
    const [first_name = '', last_name = ''] = fullName?.split(' ');

    let finalProfile = profile;

    // create profile if not exists
    if (!finalProfile) {
      const { data: insertedData, error: insertError } = await supabase.from('user_profiles').insert({
        id: user?.id,
        first_name: first_name,
        last_name: last_name,
        email: user?.email
      }).select().single();

      if (insertError) {
        return res.status(insertError?.status).json({ status: insertError?.status, success: false, message: insertError?.message });
      }

      finalProfile = insertedData;
    }

    // return finalProfile
    res.status(200).json({
      status: 200,
      success: true,
      user: {
        id: user?.id,
        email: finalProfile?.email,
        first_name: finalProfile?.first_name || "",
        last_name: finalProfile?.last_name || ""
      }
    });
  }
  catch (error) {
    console.log('Error while getting user details', error);
    res.status(error?.status).json({ status: error?.status, success: false, message: error?.message });
  }
});

// Update user profile API
router.put('/', async (req, res) => {
  try {
    const user = await verifyUserFromToken(req);
    if (!user) {
      return res.status(401).json({ status: 401, success: false, message: 'Unauthorized' });
    }

    const { first_name, last_name } = req.body;

    const { error: updateError } = await supabase.from('user_profiles').upsert({
      id: user?.id,
      first_name: first_name,
      last_name: last_name,
    });

    if (updateError) {
      res.status(updateError?.status).json({ status: updateError?.status, success: false, message: updateError?.message });
    }

    res.status(200).json({ status: 200, success: true, message: "Profile updated successfully" });
  }
  catch (error) {
    res.status(error?.status).json({ status: error?.status, success: false, message: error?.message });
  }
});

// Delete user API
router.delete('/', async (req, res) => {
  try {
    const user = await verifyUserFromToken(req);
    if (!user) {
      return res.status(401).json({ status: 401, success: false, message: 'Unauthorized' });
    }

    const { error: deleteError } = await supabase.auth.admin.deleteUser(user?.id);
    if (deleteError) {
      res.status(deleteError?.status).json({ status: deleteError?.status, success: false, message: deleteError?.message });
    }

    res.status(200).json({ status: 200, success: true, message: "Account deleted successfully" });
  }
  catch (error) {
    res.status(error?.status).json({ status: error?.status, success: false, message: error?.message });
  }
});

export default router;