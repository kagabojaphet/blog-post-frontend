// src/pages/admin/Dashboard.jsx
import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Contacts</h2>
              <p className="text-gray-600 mb-4">Manage user contact inquiries and replies.</p>
              <Link to="/admin/contacts" className="text-blue-600 hover:underline">Open Contacts →</Link>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Users</h2>
              <p className="text-gray-600 mb-4">Manage registered users (create / update / delete).</p>
              <Link to="/admin/users" className="text-blue-600 hover:underline">Open Users →</Link>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Comments</h2>
              <p className="text-gray-600 mb-4">Moderate and manage comments.</p>
              <Link to="/admin/comments" className="text-blue-600 hover:underline">Open Comments →</Link>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Blogs</h2>
              <p className="text-gray-600 mb-4">Create, edit and remove blog posts.</p>
              <Link to="/admin/blogs" className="text-blue-600 hover:underline">Open Blogs →</Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
