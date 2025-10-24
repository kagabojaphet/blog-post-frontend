// src/utils/authFetch.js
import axios from "axios";
import api from "../api/axios";

// Helper to get token from localStorage
export const getToken = () => localStorage.getItem("token");

// Create an Axios instance that automatically includes the token
const authFetch = axios.create({
  baseURL: api.defaults.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token dynamically
authFetch.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authFetch;
