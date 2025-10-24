// src/pages/admin/CommentsAdmin.jsx
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar"; // ✅ Admin sidebar
import CommentTable from "../../components/CommentTable";
import { fetchCommentsForBlog, deleteCommentById, deleteAllCommentsForBlog } from "../../api/commentApi";
import { getBlogs } from "../../api/blogApi";

const CommentsAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Load all blogs
  const loadBlogs = async () => {
    try {
      const res = await getBlogs();
      setBlogs(res);
      if (res.length > 0) setSelectedBlogId(res[0]._id);
    } catch (err) {
      console.error("Failed to load blogs:", err);
    }
  };

  // Load comments for selected blog
  const loadComments = async (blogId) => {
    if (!blogId) return;
    try {
      setLoading(true);
      const res = await fetchCommentsForBlog(blogId);
      setComments(res.data);
    } catch (err) {
      console.error("Failed to load comments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await deleteCommentById(id, token);
      setComments(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("Delete all comments for this blog?")) return;
    try {
      await deleteAllCommentsForBlog(selectedBlogId, token);
      setComments([]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    if (selectedBlogId) loadComments(selectedBlogId);
  }, [selectedBlogId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto flex">
        <AdminSidebar /> {/* ✅ Sidebar included */}
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Comments (Admin)</h1>

          <div className="mb-4 flex items-center">
            <label className="mr-2 font-semibold">Select Blog:</label>
            <select
              value={selectedBlogId}
              onChange={(e) => setSelectedBlogId(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              {blogs.map(b => (
                <option key={b._id} value={b._id}>{b.title}</option>
              ))}
            </select>
            {selectedBlogId && (
              <button
                onClick={handleDeleteAll}
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete All Comments
              </button>
            )}
          </div>

          {loading ? (
            <p>Loading comments...</p>
          ) : comments.length === 0 ? (
            <p>No comments found for this blog.</p>
          ) : (
            <CommentTable comments={comments} onDelete={handleDelete} />
          )}
        </main>
      </div>
    </div>
  );
};

export default CommentsAdmin;
