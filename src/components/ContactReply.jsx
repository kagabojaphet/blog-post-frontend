import React, { useState } from "react";
import { replyContact } from "../api/contactApi";

const ContactReply = ({ contactId, onReplied }) => {
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reply) return;
    try {
      setLoading(true);
      await replyContact(contactId, reply);
      setReply("");
      onReplied();
    } catch (err) {
      console.error(err);
      alert("Failed to send reply");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <textarea
        placeholder="Write reply..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="border rounded px-2 py-1 flex-1"
        rows={1}
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-3 py-1 rounded"
        disabled={loading}
      >
        {loading ? "Sending..." : "Reply"}
      </button>
    </form>
  );
};

export default ContactReply;
