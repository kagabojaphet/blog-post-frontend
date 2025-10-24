import api from "./axios";

// Fetch comments for a specific blog
export const fetchCommentsForBlog = (blogId) => api.get(`/comments/blog/${blogId}`);

// Create a comment
export const createComment = (blogId, content, token) =>
  api.post(`/comments/${blogId}`, { content }, { headers: { Authorization: `Bearer ${token}` } });

// Update a comment
export const updateCommentById = (id, data, token) =>
  api.put(`/comments/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

// Delete a single comment
export const deleteCommentById = (id, token) =>
  api.delete(`/comments/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// Delete all comments for a blog
export const deleteAllCommentsForBlog = (blogId, token) =>
  api.delete(`/comments/blog/${blogId}`, { headers: { Authorization: `Bearer ${token}` } });
