// src/pages/admin/BlogsAdmin.jsx
import React, { useEffect, useState, useCallback } from "react";
import AdminSidebar from "../../components/AdminSidebar"; // ✅ Admin sidebar
import BlogTable from "../../components/BlogTable";
import BlogForm from "../../components/BlogForm";
import { getBlogs, deleteBlog } from "../../api/blogApi";

const BlogsAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); // For delete confirmation popup

  // Fetch blogs
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getBlogs();
      setBlogs(data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setError("Failed to load blogs. Please login again or check permissions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Handle delete blog
  const handleDeleteConfirm = async () => {
    if (!confirmDelete) return;
    try {
      await deleteBlog(confirmDelete);
      setBlogs((prev) => prev.filter((b) => b._id !== confirmDelete));
      setConfirmDelete(null);
    } catch (err) {
      console.error("Failed to delete blog:", err);
      alert("Delete failed. Please check permissions or login again.");
    }
  };

  // Open form for edit
  const handleEdit = (blog) => {
    setEditData(blog);
    setFormOpen(true);
  };

  // Submit form data
  const handleSubmit = (formData) => {
    console.log("Submitted form:", formData);
    setFormOpen(false);
    setEditData(null);
    fetchBlogs();
  };

  if (loading) return <p className="p-6">Loading blogs...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto flex">
        <AdminSidebar /> {/* ✅ Sidebar included */}
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">All Blogs (Admin)</h1>
            <button
              onClick={() => {
                setEditData(null);
                setFormOpen(true);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              + Add Blog
            </button>
          </div>

          {/* Blog Table */}
          <BlogTable
            blogs={blogs}
            onEdit={handleEdit}
            onDelete={(id) => setConfirmDelete(id)} // Open confirm popup
            onRefresh={fetchBlogs} // ✅ Refresh button
          />

          {/* Blog Form Popup */}
          <BlogForm
            isOpen={formOpen}
            onClose={() => setFormOpen(false)}
            onSubmit={handleSubmit}
            initialData={editData}
          />

          {/* Delete Confirmation Popup */}
          {confirmDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center w-[90%] max-w-sm">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                  Are you sure you want to delete this blog?
                </h3>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleDeleteConfirm}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BlogsAdmin;
