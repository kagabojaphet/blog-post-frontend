// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">MyBlog</Link>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>

          {!user ? (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          ) : (
            <>
              {user.isAdmin && <Link to="/admin" className="hover:underline">Dashboard</Link>}
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </>
          )}
        </div>

        {/* mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-600 px-6 pb-4 space-y-2">
          <Link to="/" onClick={() => setIsOpen(false)} className="block">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block">About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block">Contact</Link>
          {!user ? (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="block">Login</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block">Register</Link>
            </>
          ) : (
            <>
              {user.isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)} className="block">Dashboard</Link>}
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block w-full text-left">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
