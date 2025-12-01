import axios from "axios";
import { useEmailGeneratorStore } from "../store/store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// adding interceptor to attach accessToken
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useEmailGeneratorStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;