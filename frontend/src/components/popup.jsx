import React from "react";
import "../styles/popup.css";
import { useTranslation } from "react-i18next";
import "../i18n";

export default function Popup({ message, onClose }) {
  const { t } = useTranslation("popup");
  
  if (!message) return null;

  return (
    <div className="popup_overlay" onClick={onClose}>
      <div className="popup_card" onClick={e => e.stopPropagation()}>
        <p>{message}</p>

        <button className="popup_btn" onClick={onClose}>
          { t("popup:button_close") }
        </button>
      </div>
    </div>
  );
}
