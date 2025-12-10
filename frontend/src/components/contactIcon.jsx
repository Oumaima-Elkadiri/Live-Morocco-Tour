import React, { useState, memo } from "react";
import { MessageCircle, Mail, PhoneCall } from "lucide-react"; // Ajout PhoneCall
import { FaWhatsapp } from "react-icons/fa";
import "../styles/contactIcon.css";

const ContactIcon = memo(() => {
  const [open, setOpen] = useState(false);

  return (
    <div className="contactIconContainer">
      {/* Main Contact Icon */}
      <div className="contact-icon" onClick={() => setOpen(!open)}>
        <MessageCircle size={30} />
      </div>

      {/* Social Icons Popup */}
      <div className={`social-popup ${open ? "active" : ""}`}>
        {/* Email */}
        <a href="mailto:your@email.com" target="_blank" rel="noreferrer" className="social-item email">
          <Mail size={22} />
        </a>

        {/* WhatsApp */}
        <a href="https://wa.me/212600000000" target="_blank" rel="noreferrer" className="social-item whats">
          <FaWhatsapp size={22} />
        </a>

        {/* Téléphone */}
        <a href="tel:+212600000000" className="social-item phone">
          <PhoneCall size={22} />
        </a>
      </div>
    </div>
  );
});

export default ContactIcon;
