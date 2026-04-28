import express from "express";
import { supabase } from "../supabase/index.js";
import Groq from "groq-sdk";
import { emailPrompt, replyPrompt } from "../utils/buildPrompt.js";
import { verifyUserFromToken } from "../utils/verifyUser.js";

const router = express.Router();
const groq = new Groq({ apiKey: process.env.AI_API_KEY });
const SUPER_USER = process.env.SUPER_USER;

// Generate new email API
router.post('/', async (req, res) => {
  try {
    const user = await verifyUserFromToken(req);
    if (!user) {
      return res.status(401).json({ status: 401, success: false, message: "Unauthorized" });
    }

    const userId = user?.id;
    const isSuperUser = userId === SUPER_USER;

    let usage = null;

    // Only fetch usage if NOT super user
    if (!isSuperUser) {
      const { data, error: fetchError } = await supabase.from('usage_limits').select('*').eq('id', userId).maybeSingle();

      // checking db errors
      if (fetchError) {
        return res.status(fetchError?.status).json({ status: fetchError?.status, success: false, message: "Database Fetch Error" });
      }

      usage = data;

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
    }

    // build prompt by using helper function
    const data = req.body;
    let prompt = data?.mode === 'reply'
      ? replyPrompt(data)
      : emailPrompt(data);

    // call AI
    let emailOutput = "";
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
      });

      emailOutput = chatCompletion.choices[0]?.message?.content || "";
    }
    catch (error) {
      let message = 'Something went wrong while generating the email.';

      if (error?.status === 429) {
        message = 'The AI service is currently handling high traffic. Please try again in a minute.';
      }

      if (error?.status === 500) {
        message = 'The AI model is temporarily unavailable. Please try again shortly.';
      }

      return res.status(error?.status).json({ status: error?.status, success: false, message: message });
    }

    // Increment usage ONLY if NOT super user
    if (!isSuperUser) {
      const { data: latest } = await supabase.from('usage_limits').select('emails_used').eq('id', userId).single();

      const newCount = (latest?.emails_used || 0) + 1;

      // increment usage count and update in supabase
      await supabase.from('usage_limits').update({ emails_used: newCount }).eq('id', userId);

      return res.status(200).json({ status: 200, success: true, output: emailOutput, remaining: process.env.DAILY_LIMIT - newCount });
    }

    // Super user response (no limit)
    return res.status(200).json({
      status: 200,
      success: true,
      output: emailOutput,
      remaining: process.env.DAILY_LIMIT
    });
  }
  catch (error) {
    res.status(error?.status).json({ status: error?.status, success: false, message: error?.message });
  }
});

export default router;