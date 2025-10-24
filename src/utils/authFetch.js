// src/utils/authFetch.js
import axios from "axios";
import api from "../api/axios";

// Helper to get token
export const getToken = () => localStorage.getItem("token");

// Function to create an axios instance with Authorization header
export const authFetch = (token = null) => {
  return axios.create({
    baseURL: api.defaults.baseURL, // same base URL as your main api instance
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });
};
