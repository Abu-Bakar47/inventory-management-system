import axios, { AxiosError } from "axios";
import type { AxiosResponse, AxiosRequestConfig } from "axios";
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}
// Define an interface for error response data
interface ErrorResponseData {
  error?: string;
}
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Ensure cookies are sent with requests
});

// 🔹 Always attach latest storeId from localStorage
axiosInstance.interceptors.request.use((config) => {
  const storeId = localStorage.getItem("storeId");
  if (storeId) {
    config.headers["X-Store-Id"] = storeId;
  } else {
    delete config.headers["X-Store-Id"];
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.data &&
      typeof error.response.data === "object" &&
      (error.response.data as ErrorResponseData).error ===
        "Authentication failed"
    ) {
      // Clear token and redirect to login
      console.log("Failed to authenticate, logging out...");
      localStorage.removeItem("token");
      window.location.replace("/login");
      return Promise.reject(error);
    }

    if (
      error.response?.data &&
      typeof error.response.data === "object" &&
      (error.response.data as ErrorResponseData).error ===
        "Refresh token not found"
    ) {
      console.log("Refresh token not found, logging out...");

      // Clear token and redirect to login
      localStorage.removeItem("token");
      window.location.replace("/login");
      return Promise.reject(error);
    }
    if (error?.response?.status === 401) {
      console.log("Token expired, logging out...", error?.response);
      if (window.location.pathname !== "/") {
        localStorage.removeItem("token");
        // window.location.replace("/login");
      }
      return Promise.reject(error);
    }

    if (
      (!error.response || error.response.status >= 500) &&
      (originalRequest._retryCount || 0) < 3
    ) {
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };
