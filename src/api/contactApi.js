import api from "./axios";

// Get token from localStorage
const getToken = () => localStorage.getItem("token") || null;

// Fetch all contacts
export const getAllContacts = async () => {
  const token = getToken();
  if (!token) throw new Error("Admin token not found. Please login.");
  const res = await api.get("/contacts", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Create a contact
export const createContact = async (data) => {
  const token = getToken();
  if (!token) throw new Error("Admin token not found. Please login.");
  const res = await api.post("/contacts", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update a contact
export const updateContact = async (id, data) => {
  const token = getToken();
  if (!token) throw new Error("Admin token not found. Please login.");
  const res = await api.put(`/contacts/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete a contact
export const deleteContact = async (id) => {
  const token = getToken();
  if (!token) throw new Error("Admin token not found. Please login.");
  const res = await api.delete(`/contacts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete all contacts
export const deleteAllContacts = async () => {
  const token = getToken();
  if (!token) throw new Error("Admin token not found. Please login.");
  const res = await api.delete("/contacts", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Reply to a contact
export const replyContact = async (id, adminReply) => {
  const token = getToken();
  if (!token) throw new Error("Admin token not found. Please login.");
  const res = await api.post(
    `/contacts/${id}/reply`,
    { adminReply },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
