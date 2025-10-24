// src/pages/Contact.jsx
import React, { useState } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Basic client-side validation
  const validateForm = () => {
    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      setStatus({ type: "error", message: "All fields are required." });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({ type: "error", message: "Invalid email address." });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!validateForm()) return;

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/contacts", formData); // Removed unused `response`
      setStatus({ type: "success", message: "Message sent successfully!" });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message || "Failed to send message. Try again.";
      setStatus({ type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-600 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
            Have questions, suggestions, or want to collaborate? We’d love to hear from you! Fill out the form below or use our contact details.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact Form */}
          <div className="bg-white p-10 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm resize-none"
                ></textarea>
              </div>

              {status.message && (
                <p className={`text-sm font-medium ${status.type === "error" ? "text-red-600" : "text-green-600"}`}>
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-10 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">Get in Touch</h2>
            <p className="text-gray-700 leading-relaxed">
              Prefer direct contact? Reach out to us using the information below. We’ll get back to you as soon as possible.
            </p>

            <div className="space-y-4 text-gray-700">
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-blue-600 w-6 h-6" />
                <span>123 MyBlog Street, Tech City, Country</span>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-blue-600 w-6 h-6" />
                <span>contact@myblog.com</span>
              </div>
              <div className="flex items-center gap-4">
                <FaPhone className="text-blue-600 w-6 h-6" />
                <span>+123 456 7890</span>
              </div>
            </div>

            <p className="text-gray-500 mt-6">
              We are available Monday to Friday, 9:00 AM – 6:00 PM.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
