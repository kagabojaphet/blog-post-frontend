import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const CommentTable = ({ comments, onDelete, onEdit }) => {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Comments</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">User</th>
              <th className="py-2">Content</th>
              <th className="py-2">Blog</th>
              <th className="py-2">Created</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((c) => (
              <tr key={c._id} className="border-b">
                <td className="py-2">{c.user?.name || "Unknown"}</td>
                <td className="py-2">{c.content}</td>
                <td className="py-2">{c.blog?.title || c.blog}</td>
                <td className="py-2">{new Date(c.createdAt).toLocaleString()}</td>
                <td className="py-2 flex gap-2">
                  <button
                    onClick={() => onEdit(c)}
                    className="px-2 py-1 bg-yellow-50 text-yellow-600 rounded"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDelete(c._id)}
                    className="px-2 py-1 bg-red-50 text-red-600 rounded"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentTable;
