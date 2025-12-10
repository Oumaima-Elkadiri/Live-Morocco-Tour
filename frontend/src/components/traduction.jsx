import React, { memo, useState } from "react";
import i18n from "../i18n";
import "../styles/LanguageSwitcher.css";

const languages = {
  en: { name: "English", flag: "https://flagcdn.com/w40/gb.png" },
  es: { name: "Espagne", flag: "https://flagcdn.com/w40/es.png" },
  du: { name: "Dutch", flag: "https://flagcdn.com/w40/nl.png" }, 
  it: { name: "Italien", flag: "https://flagcdn.com/w40/it.png" },
  ru: { name: "Russe", flag: "https://flagcdn.com/w40/ru.png" }, 
};

const LanguageSwitcher = memo(() => {
  const [selectedLang, setSelectedLang] = useState("en");
  const [open, setOpen] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLang(lang);
    setOpen(false);
  };

  return (
    <div className={`language-switcher ${open ? "open" : ""}`}>
      {/* Bouton affichant la langue actuelle + flèche */}
      <button className="selected-language" onClick={() => setOpen(!open)}>
        <img src={languages[selectedLang].flag} alt={languages[selectedLang].name} />
        <span className={`arrow ${open ? "open" : ""}`}>▾</span>
      </button>

      {/* Liste déroulante des langues */}
      <div className="language-list">
        {Object.keys(languages).map(
          (lang) =>
            lang !== selectedLang && (
              <button key={lang} className="language-option" onClick={() => changeLanguage(lang)}>
                <img src={languages[lang].flag} alt={languages[lang].name} />
              </button>
            )
        )}
      </div>
    </div>
  );
});

export default LanguageSwitcher;
