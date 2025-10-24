// src/components/AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const SidebarLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 rounded text-sm hover:bg-blue-50 ${isActive ? "bg-blue-100 font-semibold text-blue-700" : "text-gray-700"}`
    }
  >
    {children}
  </NavLink>
);

const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4 hidden lg:block">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Admin</h3>
      <div className="space-y-2">
        <SidebarLink to="/admin">Overview</SidebarLink>
        <SidebarLink to="/admin/contacts">Contacts</SidebarLink>
        <SidebarLink to="/admin/users">Users</SidebarLink>
        <SidebarLink to="/admin/comments">Comments</SidebarLink>
        <SidebarLink to="/admin/blogs">Blogs</SidebarLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
