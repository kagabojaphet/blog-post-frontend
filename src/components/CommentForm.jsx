import React, { useState, useEffect } from "react";

const CommentForm = ({ blogId, token, comment, onClose, onSaved }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (comment) setContent(comment.content);
  }, [comment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = comment
        ? `/comments/${comment._id}`
        : `/comments/${blogId}`;
      const method = comment ? "PUT" : "POST";

      const res = await fetch(`https://blog-post-backend-qrtf.onrender.com/api${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) throw new Error("Failed to save comment");
      const data = await res.json();
      onSaved(data);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error saving comment");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">{comment ? "Edit Comment" : "Add Comment"}</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded p-2 mb-4"
            rows={4}
            placeholder="Enter comment"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded border"
            >
              Cancel
            </button>
            <button type="submit" className="px-3 py-1 rounded bg-blue-500 text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
