import React, { useEffect, useState, useCallback } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import ContactTable from "../../components/ContactTable";
import ContactForm from "../../components/ContactForm";
import { getAllContacts, deleteAllContacts } from "../../api/contactApi";

const ContactsAdmin = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem("token");

  const fetchContacts = useCallback(async () => {
    if (!token) {
      alert("Admin token not found. Please login.");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await getAllContacts();
      setContacts(data);
    } catch (err) {
      console.error(err);
      alert(err.message || "Error fetching contacts");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleDeleteAll = async () => {
    if (!window.confirm("Delete all contacts?")) return;
    await deleteAllContacts();
    fetchContacts();
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setShowForm(true);
  };

  const handleSaved = (contact) => {
    const index = contacts.findIndex((c) => c._id === contact._id);
    if (index >= 0) {
      const updated = [...contacts];
      updated[index] = contact;
      setContacts(updated);
    } else {
      setContacts([contact, ...contacts]);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]); // ✅ fixed warning

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Contacts</h1>
            <div className="space-x-2">
              <button
                onClick={fetchContacts}
                className="px-3 py-1 bg-white border rounded shadow-sm"
              >
                Refresh
              </button>
              <button
                onClick={handleDeleteAll}
                className="px-3 py-1 bg-red-600 text-white rounded shadow-sm"
              >
                Delete All
              </button>
              <button
                onClick={() => {
                  setSelectedContact(null);
                  setShowForm(true);
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded shadow-sm"
              >
                Add Contact
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            {loading ? (
              <p>Loading contacts...</p>
            ) : contacts.length === 0 ? (
              <p>No contacts found.</p>
            ) : (
              <ContactTable
                contacts={contacts}
                refreshContacts={fetchContacts}
                onEdit={handleEdit}
              />
            )}
          </div>

          {showForm && (
            <ContactForm
              contact={selectedContact}
              onClose={() => setShowForm(false)}
              onSaved={handleSaved}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ContactsAdmin;
