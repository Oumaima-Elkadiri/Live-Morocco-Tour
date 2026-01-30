import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Popup from "./popup";

const NewsletterForm = () => {
  const { t, i18n } = useTranslation("footer"); // Récupération de i18n
  const [email, setEmail] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": i18n.language, // <-- ENVOI LA LANGUE
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setPopupMessage(data.message);
      setTimeout(() => setPopupMessage(""), 3000);
      setEmail("");
    } catch (error) {
      setPopupMessage("Erreur lors de l'inscription. Réessayez plus tard.");
      setTimeout(() => setPopupMessage(""), 3000);
    }
  };

  return (
    <>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder={t("newsletter.emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{t("newsletter.subscribe")}</button>
      </form> 
      <Popup message={popupMessage} onClose={() => setPopupMessage("")} />
    </>
  );
}; 

export default NewsletterForm;
