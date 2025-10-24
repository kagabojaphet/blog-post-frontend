import api from "./axios";

// Get all users (requires token)
export const getUsers = async (token) => {
  const res = await api.get("/auth", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Create a new user (requires token)
export const createUser = async (userData, token) => {
  const res = await api.post("/auth/register", userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update an existing user by ID (requires token)
export const updateUser = async (id, userData, token) => {
  const res = await api.put(`/auth/${id}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete a user by ID (requires token)
export const deleteUser = async (id, token) => {
  const res = await api.delete(`/auth/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ✅ Delete all users (admin only)
export const deleteAllUsers = async (token) => {
  const res = await api.delete("/auth", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
