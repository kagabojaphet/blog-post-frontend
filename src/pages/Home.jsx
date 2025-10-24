// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaThumbsUp, FaThumbsDown, FaShareAlt, FaCommentDots } from "react-icons/fa";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const displayedBlogs = selectedCategory
    ? blogs.filter(b => b.category === selectedCategory)
    : blogs;

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-10 animate-pulse">
        Loading blogs...
      </p>
    );

  const categories = [...new Set(blogs.map(b => b.category || "General"))];

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-4 sm:px-6 py-6 lg:py-8 bg-gray-100 min-h-screen">
      {/* Main Blogs */}
      <div className="flex-1">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center lg:text-left">
          📰 Latest Blogs {selectedCategory && `- ${selectedCategory}`}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedBlogs.map(blog => {
            return (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-1 overflow-hidden"
              >
                <img
                  src={blog.image || "https://via.placeholder.com/400x250"}
                  alt={blog.title}
                  className="w-full h-40 object-cover cursor-pointer"
                  onClick={() => navigate(`/blog/${blog._id}`)}
                />
                <div className="p-4">
                  <h3
                    className="text-lg font-semibold text-gray-800 mb-1 truncate cursor-pointer"
                    onClick={() => navigate(`/blog/${blog._id}`)}
                  >
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                    {blog.content}
                  </p>
                  <small className="block text-gray-500 mb-2 text-xs sm:text-sm">
                    By {blog.author?.name || "Unknown"} • {new Date(blog.createdAt).toLocaleDateString()}
                  </small>
                  <small className="block text-gray-400 mb-3 text-xs sm:text-sm">
                    Category: {blog.category || "General"}
                  </small>

                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex gap-2 items-center text-gray-500 text-sm">
                      {/* All icon clicks navigate to single post */}
                      <button
                        onClick={() => navigate(`/blog/${blog._id}`)}
                        className="hover:text-blue-600 transition flex items-center gap-1"
                      >
                        <FaThumbsUp size={16} />
                        <span>{blog.likes?.length || 0}</span>
                      </button>

                      <button
                        onClick={() => navigate(`/blog/${blog._id}`)}
                        className="hover:text-red-600 transition flex items-center gap-1"
                      >
                        <FaThumbsDown size={16} />
                        <span>{blog.unlikes?.length || 0}</span>
                      </button>

                      <button
                        onClick={() => navigate(`/blog/${blog._id}`)}
                        className="hover:text-green-600 transition flex items-center gap-1"
                      >
                        <FaCommentDots size={16} />
                        <span>{blog.comments?.length || 0}</span>
                      </button>

                      <button
                        onClick={() => navigate(`/blog/${blog._id}`)}
                        className="hover:text-purple-600 transition flex items-center gap-1"
                      >
                        <FaShareAlt size={16} />
                        <span>{blog.shares?.length || 0}</span>
                      </button>
                    </div>

                    <Link
                      to={`/blog/${blog._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-3 py-1 rounded-md font-medium transition"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-white shadow-sm rounded-lg p-6 h-fit">
        {/* Recent Posts */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-1">
            📅 Recent Posts
          </h3>
          <ul className="space-y-2">
            {blogs.slice(0, 5).map(blog => (
              <li
                key={blog._id}
                className="text-gray-600 hover:text-blue-600 transition cursor-pointer text-sm sm:text-base truncate"
              >
                <Link to={`/blog/${blog._id}`} className="block">
                  {blog.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-1">
            🏷️ Categories
          </h3>
          <ul className="space-y-2 text-sm sm:text-base text-gray-600">
            {categories.map(cat => (
              <li
                key={cat}
                className={`hover:text-blue-600 cursor-pointer ${
                  selectedCategory === cat ? "font-bold text-blue-700" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
            {selectedCategory && (
              <li
                className="hover:text-red-600 cursor-pointer mt-2 text-sm sm:text-base"
                onClick={() => setSelectedCategory(null)}
              >
                Clear Filter
              </li>
            )}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Home;
