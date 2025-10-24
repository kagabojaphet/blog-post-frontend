// src/api/blogApi.js
import api from "./axios";

export const getBlogs = async () => {
  const res = await api.get("/blogs");
  return res.data;
};

export const createBlog = async (formData) => {
  const res = await api.post("/blogs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateBlog = async (id, formData) => {
  const res = await api.put(`/blogs/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteBlog = async (id) => {
  const res = await api.delete(`/blogs/${id}`);
  return res.data;
};
