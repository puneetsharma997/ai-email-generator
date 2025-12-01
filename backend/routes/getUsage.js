import express from "express";
import { supabase } from "../supabase/index.js";
import { verifyUserFromToken } from "../utils/verifyUser.js";

const router = express.Router();

// Get email usage details API
router.get('/', async (req, res) => {
  try {
    const user = await verifyUserFromToken(req);
    if (!user) {
      return res.status(401).json({ status: 401, success: false, message: 'Unauthorized' });
    }

    const userId = user?.id;

    const { data: usage, error: fetchError } = await supabase.from('usage_limits').select('*').eq('id', userId).maybeSingle();

    // checking db errors
    if (fetchError) {
      return res.status(fetchError?.status).json({ status: fetchError?.status, success: false, message: 'Database Fetch Error' });
    }

    const today = new Date().toISOString().split('T')[0];

    // add record if not there or reset the emails used if new day
    if (!usage || usage.last_reset !== today) {

      const reset = {
        id: userId,
        emails_used: 0,
        last_reset: today,
      }

      await supabase.from('usage_limits').upsert(reset);

      return res.status(200).json({
        status: 200,
        success: true,
        limit: process.env.DAILY_LIMIT,
        usedToday: 0,
        remaining: process.env.DAILY_LIMIT,
        totalAvailable: process.env.DAILY_LIMIT,
        resetTime: `${today} 00:00:00`
      })
    }

    const remaining = Math.max(0, process.env.DAILY_LIMIT - usage?.emails_used);
    const used = usage?.emails_used;

    res.status(200).json({
      status: 200,
      success: true,
      limit: process.env.DAILY_LIMIT,
      usedToday: used,
      remaining: remaining,
      totalAvailable: remaining,
      resetTime: `${today} 00:00:00`
    });
  }
  catch (error) {
    res.status(error?.status).json({ status: error?.status, success: false, message: error.message });
  }
})

export default router;