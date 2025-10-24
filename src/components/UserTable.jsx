// src/components/UserTable.jsx
import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const UserTable = ({ users, onDelete, onEdit }) => {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Users</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Admin</th>
              <th className="py-2">Registered</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-b">
                <td className="py-2">{u.name}</td>
                <td className="py-2 text-blue-600">{u.email}</td>
                <td className="py-2">{u.isAdmin ? "Yes" : "No"}</td>
                <td className="py-2">{new Date(u.createdAt).toLocaleString()}</td>
                <td className="py-2">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onEdit(u)} 
                      className="px-2 py-1 bg-blue-50 text-blue-600 rounded flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button 
                      onClick={() => onDelete(u._id)} 
                      className="px-2 py-1 bg-red-50 text-red-600 rounded flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
