import React, { useState } from "react";
import { FaReply, FaEdit, FaTrash } from "react-icons/fa";
import { deleteContact } from "../api/contactApi";
import ContactReply from "./ContactReply";

const ContactTable = ({ contacts, refreshContacts, onEdit }) => {
  const [replyingId, setReplyingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    await deleteContact(id);
    refreshContacts();
  };

  const handleReplied = () => {
    setReplyingId(null);
    refreshContacts();
  };

  return (
    <table className="min-w-full table-auto border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 border">Name</th>
          <th className="px-4 py-2 border">Email</th>
          <th className="px-4 py-2 border">Subject</th>
          <th className="px-4 py-2 border">Status</th>
          <th className="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((c) => (
          <tr key={c._id} className="hover:bg-gray-100">
            <td className="px-4 py-2 border">{c.name}</td>
            <td className="px-4 py-2 border">{c.email}</td>
            <td className="px-4 py-2 border">{c.subject}</td>
            <td className="px-4 py-2 border">{c.status || "pending"}</td>
            <td className="px-4 py-2 border space-y-1">
              <div className="flex gap-2">
                {/* Edit / Update */}
                <button
                  onClick={() => onEdit(c)}
                  className="bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1"
                  title="Edit / Update"
                >
                  <FaEdit /> Edit
                </button>

                {/* Reply */}
                <button
                  onClick={() =>
                    setReplyingId(replyingId === c._id ? null : c._id)
                  }
                  className="bg-green-500 text-white px-2 py-1 rounded flex items-center gap-1"
                  title="Reply"
                >
                  <FaReply /> Reply
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(c._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1"
                  title="Delete"
                >
                  <FaTrash /> Delete
                </button>
              </div>

              {replyingId === c._id && (
                <ContactReply contactId={c._id} onReplied={handleReplied} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ContactTable;
