import { useAuthStore } from "@/lib/auth.store";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.response.use(
  (r) => r,
  (error) => {
    const status = error.response?.status;
    const hasToken = !!useAuthStore.getState().accessToken;

    if (status === 401 && hasToken) {
      useAuthStore.getState().logout();
      window.location.href = "/login";
    }

    return Promise.reject(error.response?.data);
  },
);

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
