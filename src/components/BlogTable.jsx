// src/components/BlogTable.jsx
import React, { useState } from "react";
import { FaTrash, FaEdit} from "react-icons/fa";

const BlogTable = ({ blogs, onDelete, onEdit,  }) => {
  const [deleteTarget, setDeleteTarget] = useState(null);

  const confirmDelete = (id) => setDeleteTarget(id);
  const closeDeletePopup = () => setDeleteTarget(null);
  const handleDelete = () => {
    onDelete(deleteTarget);
    closeDeletePopup();
  };

  return (
    <div className="bg-white rounded shadow p-4 relative">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Blogs</h3>
     
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-2 px-3">Title</th>
              <th className="py-2 px-3">Category</th>
              <th className="py-2 px-3">Author</th>
              <th className="py-2 px-3">Likes</th>
              <th className="py-2 px-3">Shares</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No blogs found.
                </td>
              </tr>
            ) : (
              blogs.map((b) => (
                <tr key={b._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-3">{b.title}</td>
                  <td className="py-2 px-3">{b.category || "—"}</td>
                  <td className="py-2 px-3">{b.author?.name || "Unknown"}</td>
                  <td className="py-2 px-3">{b.likes?.length || 0}</td>
                  <td className="py-2 px-3">{b.shares?.length || 0}</td>
                  <td className="py-2 px-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(b)}
                        className="px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => confirmDelete(b._id)}
                        className="px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Popup */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Are you sure you want to delete this blog?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={closeDeletePopup}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogTable;
