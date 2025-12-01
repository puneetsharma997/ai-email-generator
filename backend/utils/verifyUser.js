import { supabase } from "../supabase/index.js";

// function to verify user from token
export const verifyUserFromToken = async (req) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1];

  if (!token) {
    throw new Error('Auth token is missing');
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    throw error || new Error('Token is invalid or expired');
  }

  return data?.user;
}