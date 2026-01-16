import React, { useState } from "react";
import "../styles/adminNewsletter.css";

const AdminNewsletter = () => {
  const [adminKey, setAdminKey] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/newsletter/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": adminKey, // ✅ clé tapée par l’admin
          },
          body: JSON.stringify({
            subject,
            message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setStatus(`❌ ${data.message || "Error sending newsletter"}`);
      } else {
        setStatus(`✅ ${data.message}`);
        setSubject("");
        setMessage("");
        setAdminKey("");
      }
    } catch (error) {
      setStatus("❌ Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Newsletter</h1>

      <form className="admin-form" onSubmit={handleSend}>
        <label>Admin Key</label>
        <input
          type="password"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          placeholder="Enter admin key"
          required
        />

        <label>Email Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Newsletter subject"
          required
        />

        <label>Message</label>
        <textarea
          rows="8"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Newsletter"}
        </button>

        {status && <p className="status">{status}</p>}
      </form>
    </div>
  );
};

export default AdminNewsletter;
