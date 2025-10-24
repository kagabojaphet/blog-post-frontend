// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ContactsAdmin from "./pages/admin/ContactsAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import CommentsAdmin from "./pages/admin/CommentsAdmin";
import BlogsAdmin from "./pages/admin/BlogsAdmin";

// Admin guard (reads localStorage user)
const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user || !user.isAdmin) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<SinglePost />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/contacts" element={<AdminRoute><ContactsAdmin /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><UsersAdmin /></AdminRoute>} />
        <Route path="/admin/comments" element={<AdminRoute><CommentsAdmin /></AdminRoute>} />
        <Route path="/admin/blogs" element={<AdminRoute><BlogsAdmin /></AdminRoute>} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
