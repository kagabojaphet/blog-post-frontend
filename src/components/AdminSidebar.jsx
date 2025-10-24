import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

const SidebarLink = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `block px-4 py-2 rounded text-sm hover:bg-blue-50 ${
        isActive
          ? "bg-blue-100 font-semibold text-blue-700"
          : "text-gray-700"
      }`
    }
  >
    {children}
  </NavLink>
);

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Top bar for mobile */}
      <div className="flex items-center justify-between bg-white border-b border-gray-200 p-4 lg:hidden fixed top-0 left-0 w-full z-40">
        <h3 className="text-lg font-bold text-gray-800">Admin</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 text-2xl focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-white border-r border-gray-200 p-4 flex flex-col justify-between transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Top Section */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4 hidden lg:block">
            Admin
          </h3>

          <div className="space-y-2 mt-8 lg:mt-0">
            <SidebarLink to="/admin" onClick={() => setIsOpen(false)}>
              Overview
            </SidebarLink>
            <SidebarLink to="/admin/contacts" onClick={() => setIsOpen(false)}>
              Contacts
            </SidebarLink>
            <SidebarLink to="/admin/users" onClick={() => setIsOpen(false)}>
              Users
            </SidebarLink>
            <SidebarLink to="/admin/comments" onClick={() => setIsOpen(false)}>
              Comments
            </SidebarLink>
            <SidebarLink to="/admin/blogs" onClick={() => setIsOpen(false)}>
              Blogs
            </SidebarLink>
          </div>
        </div>

        {/* Bottom Logout Button (Left-aligned) */}
        <div className="border-t border-gray-200 pt-4 mt-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded transition justify-start"
          >
            <FaSignOutAlt className="text-red-600" />
            Logout
          </button>
        </div>
      </aside>

      {/* Dark overlay when open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
