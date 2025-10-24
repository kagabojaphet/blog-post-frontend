// src/pages/admin/CommentsAdmin.jsx
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import CommentTable from "../../components/CommentTable";
import CommentForm from "../../components/CommentForm";
import { fetchCommentsForBlog, deleteCommentById, deleteAllCommentsForBlog } from "../../api/commentApi";
import { getBlogs } from "../../api/blogApi";
import { FaSync } from "react-icons/fa";

const CommentsAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);

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

  // Refresh comments
  const handleRefresh = () => {
    if (selectedBlogId) loadComments(selectedBlogId);
  };

  // Delete single comment
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await deleteCommentById(id, token);
      setComments(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Delete all comments
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
        <AdminSidebar />

        <main className="flex-1 p-8">
          {/* Page Title + Buttons on top right */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Comments (Admin)</h1>

            {selectedBlogId && (
              <div className="flex gap-2">
                <button
                  onClick={handleRefresh}
                  className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <FaSync /> Refresh
                </button>
                <button
                  onClick={() => {
                    setSelectedComment(null);
                    setShowForm(true);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  + Add Comment
                </button>

                <button
                  onClick={handleDeleteAll}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete All
                </button>

                
              </div>
            )}
          </div>

          {/* Blog selector */}
          <div className="mb-4">
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
          </div>

          {/* Comments Table */}
          {loading ? (
            <p>Loading comments...</p>
          ) : comments.length === 0 ? (
            <p>No comments found for this blog.</p>
          ) : (
            <CommentTable
              comments={comments}
              onDelete={handleDelete}
              onEdit={(c) => {
                setSelectedComment(c);
                setShowForm(true);
              }}
            />
          )}

          {/* Add/Edit Comment Form */}
          {showForm && (
            <CommentForm
              blogId={selectedBlogId}
              token={token}
              comment={selectedComment}
              onSaved={(data) => {
                setComments(prev => {
                  const index = prev.findIndex(c => c._id === data._id);
                  if (index >= 0) {
                    const updated = [...prev];
                    updated[index] = data;
                    return updated;
                  }
                  return [data, ...prev];
                });
              }}
              onClose={() => {
                setShowForm(false);
                setSelectedComment(null);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default CommentsAdmin;
