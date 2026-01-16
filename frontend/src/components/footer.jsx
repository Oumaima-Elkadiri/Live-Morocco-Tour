import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import "../i18n";
import "../styles/footer.css";
import logo from "../assets/images/Logo.png";

import {
  FaWhatsapp,
  FaTripadvisor,
  FaInstagram,
  FaFacebook,
  FaCcVisa,
  FaCcMastercard,
  FaPaypal
} from "react-icons/fa";

import { Link } from "react-router-dom";
import NewsletterForm from "./NewsletterForm";

const Footer = memo(() => {
  const { t } = useTranslation("footer");

  const phoneNumber1 = "+212623199726";

  return (
    <footer className="footer">

      {/* ----- TOP PART ----- */}
      <div className="footer-top">

        {/* ---- Left: Logo Section ---- */}
        <div className="footer-section section1">
          <img src={logo} alt="Live Morocco Tour" className="footer-logo" />
          <p>{t("parag")}</p>

          <div className="social-icons">
            <a href={`https://wa.me/${phoneNumber1}`} target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            <a href="https://www.instagram.com/moroccan_trails1/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.facebook.com/profile.php?id=61584734673978" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://www.tripadvisor.com/Attraction_Review-g304017-d33032002-Reviews-Moroccan_Trails-Merzouga_Draa_Tafilalet.html" target="_blank" rel="noopener noreferrer"><FaTripadvisor /></a>
          </div>
        </div>

        {/* ---- Quick Links ---- */}
        <div className="footer-section section2">
          <h3>{t("quickLinks.title")}</h3>
          <ul>
            <li><Link to="/About">{t("quickLinks.aboutUs")}</Link></li>
            <li><a href="https://www.tripadvisor.com/Attraction_Review-g304017-d33032002-Reviews-Moroccan_Trails-Merzouga_Draa_Tafilalet.html" target="_blank" rel="noopener noreferrer">{t("quickLinks.ourTours")}</a></li>
            <li><a href="https://www.visitmorocco.com" target="_blank" rel="noopener noreferrer">{t("quickLinks.destinations")}</a></li>
            <li><a href="https://www.instagram.com/moroccan_trails1/" target="_blank" rel="noopener noreferrer">{t("quickLinks.travelBlog")}</a></li>
            <li><Link to="/Contact">{t("quickLinks.contact")}</Link></li>
          </ul>
        </div>

        {/* ---- Support ---- */}
        <div className="footer-section section3">
          <h3>{t("support.title")}</h3>
          <ul> 
            <li><a href={`https://wa.me/${phoneNumber1}`} target="_blank" rel="noopener noreferrer">{t("support.helpCenter")}</a></li>
            <li><a href="/pdfs/booking-policy.pdf" target="_blank" rel="noopener noreferrer">{t("support.booking")}</a></li>
            <li><a href="/pdfs/cancellation-policy.pdf" target="_blank" rel="noopener noreferrer">{t("support.cancellation")}</a></li>
            <li><a href="/pdfs/travel-insurance.pdf" target="_blank" rel="noopener noreferrer">{t("support.travelInsurance")}</a></li>
            <li><a href="/pdfs/safety-guidelines.pdf" target="_blank" rel="noopener noreferrer">{t("support.safetyGuidelines")}</a></li>
          </ul>

        </div>

        {/* ---- Newsletter Form (reusable component) ---- */}
        <div className="footer-section section4">
          <h3>{t("newsletter.title")}</h3>
          <p>{t("newsletter.message")}</p>
 
          {/* Component importé */}
          <NewsletterForm />

          <div className="payment-icons">
            <FaCcVisa />
            <FaCcMastercard />
            <FaPaypal />
          </div>
        </div>

      </div>

      {/* ----- BOTTOM PART ----- */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Live Morocco Tour — All Rights Reserved.
        </p>
      </div>

    </footer>
  );
});

export default Footer;
