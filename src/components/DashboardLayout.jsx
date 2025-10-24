// src/components/DashboardLayout.jsx
import React from "react";
import AdminSidebar from "./AdminSidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content area */}
      <main className="flex-1 p-4 md:p-6 mt-16 lg:mt-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
