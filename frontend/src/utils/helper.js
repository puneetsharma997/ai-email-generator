import toast from "react-hot-toast";
import CustomToast from "../components/CustomToast/CustomToast";
import { useEmailGeneratorStore } from "../store/store";
import { logoutUser } from "../supabase/authentication";
import { tokenExpiredMessage } from "./constants";


// function to validate password and confirm password matching
export const validatePasswordMatch = (values) => {
  const confirmInput = document.getElementById("confirmPasswordInput");

  if (!confirmInput) return;
  if (values.confirmPassword && values.password !== values.confirmPassword) {
    confirmInput.setCustomValidity("Passwords do not match");
  } else {
    confirmInput.setCustomValidity("");
  }
};

// function to redirect to homepage
export const handleGoToHomepage = (navigate, replace = false) => {
  navigate('/', { replace: replace });
}

// function to logout automatically if session expired
export const sessionExpired = async (navigate) => {
  const { resetStore } = useEmailGeneratorStore.getState();

  try {
    await logoutUser();
    resetStore();       // reset zustand store

    toast.dismiss();
    CustomToast({
      type: 'error',
      message: tokenExpiredMessage,
      duration: 5000,
    });

    navigate('/', { replace: true });
  }
  catch (error) {
    CustomToast({ type: 'error', message: error?.message });
  }
}

// function to check if email is confirmed after signup 
export const checkEmailConfirmed = (navigate) => {
  const currentUrl = window.location.href;
  const params = new URLSearchParams(currentUrl);
  const token = params.get('token');
  const type = params.get('type');
  const errorDescription = params.get('error_description');

  if (errorDescription) {
    if (errorDescription.includes('expired')) {
      CustomToast({
        type: 'error',
        message: 'Your link has expired. Please request a new one.',
      });

      navigate('/', { replace: true });
      return;
    }
    else {
      CustomToast({
        type: 'error',
        message: errorDescription,
      });
      navigate('/', { replace: true });
      return;
    }
  }
  else if (type === 'signup' || token) {
    CustomToast({
      type: 'success',
      message: 'Email confirmed. You can now log in.',
    });
    navigate('/', { replace: true });
  }
}