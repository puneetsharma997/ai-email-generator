import { supabase } from "./supabaseClient";

// login using supabase
export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email, password
  });

  if (error) throw error;

  return data;
}

// sign up using supabase
export const signupUser = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email, password,
    options: {
      redirectTo: `${window.location.origin}/confirmed`,
    }
  });

  if (error) throw error;

  return data;
};

// login with google in supabase
export const loginUserWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/success`
    }
  });

  if (error) throw error;

  return data;
}

// logout using supabase
export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
}

// send reset password link using supabase
export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  });

  if (error) throw error;

  return data;
}

// update password after reset using supabase
export const updatePassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) throw error;

  return data;
}