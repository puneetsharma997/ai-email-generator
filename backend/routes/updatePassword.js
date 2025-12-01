import express from "express";
import { supabase, supabaseUserClient } from "../supabase/index.js";
import { verifyUserFromToken } from "../utils/verifyUser.js";

const router = express.Router();

// Update password API
router.put('/', async (req, res) => {
  try {
    const user = await verifyUserFromToken(req);
    if (!user) {
      return res.status(401).json({ status: 401, success: false, message: 'Unauthorized' });
    }

    const { currentPassword, newPassword } = req.body;

    // checking if current password is valid or not by logging in using that password
    const { error: loginError } = await supabaseUserClient.auth.signInWithPassword({
      email: user?.email,
      password: currentPassword,
    });

    if (loginError) {
      return res.status(loginError?.status).json({ status: loginError?.status, success: false, message: 'Current password is incorrect' });
    }

    // updating password if current password is correct
    const { error: updateError } = await supabase.auth.admin.updateUserById(user?.id, {
      password: newPassword
    });

    if (updateError) {
      return res.status(updateError?.status).json({ status: updateError?.status, success: false, message: updateError?.message });
    }

    res.status(200).json({ status: 200, success: true, message: 'Password updated successfully' });
  }
  catch (error) {
    res.status(error?.status).json({ status: error?.status, success: false, message: error.message });
  }
});

export default router;