// src/api/blogApi.js
import api from "./axios";

// Get all blogs
export const getBlogs = async () => {
  const res = await api.get("/blogs");
  return res.data;
};

// Create a new blog
export const createBlog = async (formData) => {
  const res = await api.post("/blogs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Update an existing blog by ID
export const updateBlog = async (id, formData) => {
  const res = await api.put(`/blogs/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Delete a single blog by ID
export const deleteBlog = async (id) => {
  const res = await api.delete(`/blogs/${id}`);
  return res.data;
};

// ✅ Delete all blogs
export const deleteAllBlogs = async () => {
  const res = await api.delete("/blogs"); // Assuming backend supports DELETE /blogs to remove all
  return res.data;
};
