import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ========== Global Error Interceptor ==========
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const err = error?.response?.data || {};

    // Optional: log or handle specific errors globally
    if (error.response?.status === 401) {
      console.warn("Unauthorized — maybe redirect to login page");
      // Optionally: redirect to login
      // window.location.href = '/login';
    }

    if (error.response?.status === 500) {
      console.error("Server error:", err.message || "Internal server error");
    }

    // Customize the error object
    const customError = new Error(
      err.message || "An unexpected error occurred"
    );
    customError.status = error.response?.status || 500;
    customError.data = err;

    return Promise.reject(customError);
  }
);

export default api;
