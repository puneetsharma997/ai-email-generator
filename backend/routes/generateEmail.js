import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import { supabase } from "../supabase/index.js";
import { emailPrompt, replyPrompt } from "../utils/buildPrompt.js";
import { verifyUserFromToken } from "../utils/verifyUser.js";

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate new email API
router.post('/', async (req, res) => {
  try {
    const user = await verifyUserFromToken(req);
    if (!user) {
      return res.status(401).json({ status: 401, success: false, message: "Unauthorized" });
    }

    const userId = user?.id;

    // get usage record
    const { data: usage, error: fetchError } = await supabase.from('usage_limits').select('*').eq('id', userId).maybeSingle();

    // checking db errors
    if (fetchError) {
      return res.status(fetchError?.status).json({ status: fetchError?.status, success: false, message: "Database Fetch Error" });
    }

    const today = new Date().toISOString().split('T')[0];

    // reset if new day or no record
    if (!usage || usage?.last_reset !== today) {
      const reset = {
        id: userId,
        emails_used: 0,
        last_reset: today
      };

      await supabase.from("usage_limits").upsert(reset);
    }

    // daily limit check
    else if (usage?.emails_used >= process.env.DAILY_LIMIT) {
      return res.status(429).json({ success: false, message: 'Daily email limit reached' })
    }

    // build prompt by using helper function
    const data = req.body;
    let prompt = '';
    if (data?.mode === 'reply') {
      prompt = replyPrompt(data);
    }
    else {
      prompt = emailPrompt(data);
    }
    // const prompt = emailPrompt(data);

    // call gemini
    let emailOutput = "";
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      const result = await model.generateContent(prompt);
      emailOutput = result?.response?.text() || "";
    }
    catch (error) {
      return res.status(error?.status).json({ status: error?.status, success: false, message: error.message || 'Error while generating email.' });
    }

    // get latest usage count
    const { data: latest } = await supabase.from('usage_limits').select('emails_used').eq('id', userId).single();
    const newCount = (latest?.emails_used || 0) + 1;

    // increment usage count and update in supabase
    await supabase.from('usage_limits').update({ emails_used: newCount }).eq('id', userId);

    res.status(200).json({ status: 200, success: true, output: emailOutput, remaining: process.env.DAILY_LIMIT - newCount });
  }
  catch (error) {
    res.status(error?.status).json({ status: error?.status, success: false, message: error.message });
  }
});

export default router;