// src/pages/admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Link } from "react-router-dom";
import { getBlogs } from "../../api/blogApi";
import { getUsers } from "../../api/userApi";
import { fetchCommentsForBlog } from "../../api/commentApi";
import { getAllContacts } from "../../api/contactApi";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    blogs: 0,
    users: 0,
    comments: 0,
    contacts: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const [blogs, users, contactsData] = await Promise.all([
          getBlogs(),
          getUsers(token),
          getAllContacts(),
        ]);

        let totalComments = 0;
        for (const blog of blogs) {
          const res = await fetchCommentsForBlog(blog._id);
          totalComments += res.data?.length || 0;
        }

        setStats({
          blogs: blogs.length,
          users: users.length,
          comments: totalComments,
          contacts: contactsData.length || 0,
        });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.entries(stats).map(([key, value]) => (
          <div
            key={key}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg text-center"
          >
            <h2 className="text-xl font-semibold capitalize">{key}</h2>
            <p className="text-3xl text-blue-600 font-bold mt-2">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminCard title="Contacts" to="/admin/contacts" desc="Manage user contact inquiries and replies." />
        <AdminCard title="Users" to="/admin/users" desc="Manage registered users (create / update / delete)." />
        <AdminCard title="Comments" to="/admin/comments" desc="Moderate and manage comments." />
        <AdminCard title="Blogs" to="/admin/blogs" desc="Create, edit and remove blog posts." />
      </div>
    </DashboardLayout>
  );
};

const AdminCard = ({ title, desc, to }) => (
  <div className="bg-white p-6 rounded shadow">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-600 mb-4">{desc}</p>
    <Link to={to} className="text-blue-600 hover:underline">
      Open {title} →
    </Link>
  </div>
);

export default AdminDashboard;
