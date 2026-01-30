import React, { useState } from "react";
import Popup from "./popup";
import "../styles/formDetails.css";

const FormDetails = ({ nameTour }) => {
  const [popupMessage, setPopupMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    travelers: "",
    country: "",
    whatsapp: "",
    enquiry: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendForm = async (e) => {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tour-enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tourName: nameTour,
        ...formData,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setPopupMessage(data.message || "Message sent successfully ✔");

      // Reset form fields
      setFormData({
        fullName: "",
        email: "",
        travelers: "",
        country: "",
        whatsapp: "",
        enquiry: "",
      });
    } else {
      setPopupMessage(data.message || "Error sending message ❌");
    }

    setTimeout(() => setPopupMessage(""), 3000);
  };

  return (
    <>
      <div className="entete">
        <h2>Send Us Enquiry</h2>
      </div>

      <form onSubmit={sendForm} className="details-form">
        <label>Full Name*</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

        <label>Email Address*</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Number Of Travelers</label>
        <input type="number" name="travelers" value={formData.travelers} onChange={handleChange} />

        <label>Country*</label>
        <input type="text" name="country" value={formData.country} onChange={handleChange} required />

        <label>Whatsapp</label>
        <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />

        <label>Your Enquiry / Date*</label>
        <textarea name="enquiry" value={formData.enquiry} onChange={handleChange} required />

        <button type="submit">Send</button>
      </form>

      <Popup message={popupMessage} onClose={() => setPopupMessage("")} />
    </>
  );
};

export default FormDetails;
