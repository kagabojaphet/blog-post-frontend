// src/pages/SinglePost.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaShareAlt,
  FaCommentDots,
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
  FaLink
} from "react-icons/fa";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [related, setRelated] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Fetch post + related blogs
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        const currentPost = res.data;
        setPost(currentPost);
        setComments(currentPost.comments || []);

        if (currentPost.category) {
          const relatedRes = await axios.get(
            `http://localhost:5000/api/blogs?category=${encodeURIComponent(currentPost.category)}`
          );
          const sameCategory = relatedRes.data.filter(
            (b) => b._id !== currentPost._id && b.category === currentPost.category
          );
          setRelated(sameCategory.slice(0, 5));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Close share dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shareRef.current && !shareRef.current.contains(e.target)) {
        setShowShareOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Like / Unlike
  const handleAction = async (action) => {
    if (!user) return alert("Please login first.");
    try {
      const res = await axios.post(
        `http://localhost:5000/api/blogs/${id}/${action}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setPost(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Action failed");
    }
  };

  // Share count update
  const handleShare = async () => {
    if (!user) return alert("Please login first.");
    try {
      const res = await axios.post(
        `http://localhost:5000/api/blogs/${id}/share`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setPost(res.data); // Update share count
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Share failed");
    }
  };

  // Post comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login first.");
    if (!newComment.trim()) return;
    try {
      setCommentLoading(true);
      const res = await axios.post(
        `http://localhost:5000/api/comments/${id}`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error(err);
      alert("Failed to post comment");
    } finally {
      setCommentLoading(false);
    }
  };

  // Copy link share
  const copyLink = async () => {
    if (!user) return alert("Please login first.");
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
    await handleShare(); // increment share count
    setShowShareOptions(false);
  };

  const handleShareClick = () => {
    if (!user) return alert("Please login first.");
    setShowShareOptions(!showShareOptions);
  };

  const shareLinks = [
    { name: "Facebook", url: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, icon: <FaFacebookF /> },
    { name: "WhatsApp", url: `https://api.whatsapp.com/send?text=${window.location.href}`, icon: <FaWhatsapp /> },
    { name: "Instagram", url: `https://www.instagram.com/`, icon: <FaInstagram /> },
    { name: "X (Twitter)", url: `https://twitter.com/intent/tweet?url=${window.location.href}`, icon: <FaTwitter /> },
  ];

  if (loading) return <p className="text-center mt-10 text-gray-600 animate-pulse">Loading blog...</p>;
  if (!post) return <p className="text-center mt-10 text-gray-500">Blog not found.</p>;

  const liked = post.likes?.includes(user?.id);
  const disliked = post.unlikes?.includes(user?.id);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* Main Blog */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <img
            src={post.image || "https://via.placeholder.com/800x400"}
            alt={post.title}
            className="w-full mb-4 rounded-lg object-cover shadow-sm"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <p className="text-gray-700 mb-4">{post.content}</p>

          <small className="block text-gray-500 mb-2 text-xs sm:text-sm">
            By {post.author?.name || "Unknown"} • {new Date(post.createdAt).toLocaleDateString()}
          </small>

          <small className="block text-gray-400 mb-3 text-xs sm:text-sm">
            Category: {post.category || "General"}
          </small>

          {/* Action Buttons */}
          <div className="flex items-left gap-4 mb-6 flex-nowrap">
            <button
              onClick={() => handleAction("like")}
              className={`flex items-center gap-1 px-3 py-1 rounded-full ${liked ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600"} transition`}
            >
              <FaThumbsUp /> {post.likes?.length || 0}
            </button>

            <button
              onClick={() => handleAction("unlike")}
              className={`flex items-center gap-1 px-3 py-1 rounded-full ${disliked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600"} transition`}
            >
              <FaThumbsDown /> {post.unlikes?.length || 0}
            </button>

            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-600">
              <FaCommentDots /> {comments.length}
            </div>

            {/* Share Button with Dropdown */}
            <div className="relative" ref={shareRef}>
              <button
                onClick={handleShareClick}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition"
              >
                <FaShareAlt /> {post.shares?.length || 0}
              </button>

              {showShareOptions && (
                <div className="absolute top-12 left-0 bg-white shadow-md rounded-md border border-gray-200 z-50 w-52 py-2">
                  <button
                    onClick={copyLink}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    <FaLink /> Copy Link
                  </button>
                  {shareLinks.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                      onClick={async (e) => {
                        if (!user) {
                          e.preventDefault();
                          alert("Please login first.");
                          return;
                        }
                        await handleShare(); // increment count
                      }}
                    >
                      {s.icon} {s.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
            ← Back to Home
          </Link>

          {/* Comments Section */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Comments ({comments.length})</h2>
            {user ? (
              <form onSubmit={handleSubmitComment} className="mb-6">
                <textarea
                  className="w-full border border-gray-300 rounded-md p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  rows={3}
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={commentLoading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  {commentLoading ? "Posting..." : "Post Comment"}
                </button>
              </form>
            ) : (
              <p className="text-gray-500 mb-4">
                Please <Link to="/login" className="text-blue-600 underline">login</Link> to post a comment.
              </p>
            )}

            <div className="space-y-4">
              {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
              {comments.map((c) => (
                <div key={c._id} className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <p className="text-gray-800 font-medium">{c.user?.name || "Unknown"}</p>
                  <p className="text-gray-700 text-sm">{c.content}</p>
                  <p className="text-gray-400 text-xs mt-1">{new Date(c.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Blogs Sidebar */}
        <aside className="bg-white p-6 rounded-lg shadow-lg h-fit">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Related Blogs</h3>
          <div className="space-y-3">
            {related.length === 0 ? (
              <p className="text-gray-500 text-sm">No related blogs found in this category.</p>
            ) : (
              related.map((b) => (
                <Link
                  key={b._id}
                  to={`/blog/${b._id}`}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md transition"
                >
                  <img
                    src={b.image || "https://via.placeholder.com/40"}
                    alt={b.title}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div className="flex-1 overflow-hidden">
                    <h4 className="font-medium text-gray-800 truncate text-sm">{b.title}</h4>
                    <p className="text-gray-500 text-xs truncate">{b.category}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SinglePost;
