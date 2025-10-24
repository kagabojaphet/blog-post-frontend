// src/pages/admin/UsersAdmin.jsx
import React, { useEffect, useState, useCallback } from "react";
import AdminSidebar from "../../components/AdminSidebar"; // ✅ Sidebar
import { getUsers, createUser, updateUser, deleteUser, deleteAllUsers } from "../../api/userApi";
import { getToken } from "../../utils/authFetch";
import UserForm from "../../components/UserForm";
import UserTable from "../../components/UserTable"; // ✅ Import UserTable
import { FaSync } from "react-icons/fa";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = getToken();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsers(token);
      setUsers(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (selectedUser) {
        await updateUser(selectedUser._id, formData, token);
        alert("User updated successfully!");
      } else {
        await createUser(formData, token);
        alert("User created successfully!");
      }
      setShowForm(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to save user.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id, token);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    }
  };

  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete all users?")) return;
    try {
      await deleteAllUsers(token);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete all users.");
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto flex">
        <AdminSidebar /> {/* ✅ Sidebar included */}
        <main className="flex-1 p-8">
          {/* Page title and action buttons */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Manage Users</h2>
            <div className="flex gap-2">
              <button
                onClick={fetchUsers} // ✅ Refresh button
                className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                <FaSync /> Refresh
              </button>

              <button
                onClick={handleDeleteAll} // ✅ Delete All button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete All
              </button>

              <button
                onClick={() => {
                  setShowForm(true);
                  setSelectedUser(null);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                + Add User
              </button>
            </div>
          </div>

          {/* User form */}
          {showForm && (
            <UserForm
              onSubmit={handleCreateOrUpdate}
              userToEdit={selectedUser}
              onCancel={() => setShowForm(false)}
            />
          )}

          {/* Users table */}
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading users...</div>
          ) : (
            <UserTable 
              users={users} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default UsersAdmin;
