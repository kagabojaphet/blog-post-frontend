import api from "./axios";

// Get all users (requires token)
export const getUsers = async (token) => {
  const res = await api.get("/auth", { // ✅ use /auth, not /users
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Create a new user (requires token)
export const createUser = async (userData, token) => {
  const res = await api.post("/auth/register", userData, { // ✅ /auth/register
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update an existing user by ID (requires token)
export const updateUser = async (id, userData, token) => {
  const res = await api.put(`/auth/${id}`, userData, { // ✅ /auth/:userId
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete a user by ID (requires token)
export const deleteUser = async (id, token) => {
  const res = await api.delete(`/auth/${id}`, { // ✅ /auth/:userId
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
