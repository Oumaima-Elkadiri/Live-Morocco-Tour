import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../i18n";
import Popup from "./popup";

const ContactForm = () => {
  const { t, i18n } = useTranslation(["contact"]); // Récupération de i18n
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
    const [popupMessage, setPopupMessage] = useState("");

  const handleSubmitContact = async (e) => {
    e.preventDefault();

    const formData = { nom, email, message };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": i18n.language, // <-- ENVOI LA LANGUE
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setPopupMessage(data.message);
      setTimeout(() => setPopupMessage(""), 3000);

      // reset du formulaire
      setNom("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setPopupMessage("Erreur serveur. Réessayez plus tard.");
      setTimeout(() => setPopupMessage(""), 3000);
    }
  };

  return (<>
    <form onSubmit={handleSubmitContact}>
      <label htmlFor="nom">{t("nom")}</label>
      <input
        type="text"
        id="nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
      />
 
      <label htmlFor="email">{t("email")}</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="message">{t("message")}</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="5"
        required
      />

      <button type="submit">{t("button")}</button>
    </form>
    <Popup message={popupMessage} onClose={() => setPopupMessage("")} />
  </>);
};

export default ContactForm;
