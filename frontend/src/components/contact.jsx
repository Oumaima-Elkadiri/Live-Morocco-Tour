import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import "../i18n";
import { useLocation } from "react-router-dom";
import contact1 from '../assets/images/contact1.jpg';
import contact2 from '../assets/images/contact2.jpeg';
import contact3 from '../assets/images/contact3.jpg';
import '../styles/contact.css';
import { FaWhatsapp, FaTripadvisor, FaInstagram, FaFacebook, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import NewsletterForm from './NewsletterForm';
import ContactForm from './ContactForm';

const Contact = () => {
  const { t } = useTranslation(["contact"]);
  const location = useLocation();

  // Numéro de téléphone et e-mail
  const phoneNumber1 = "+212623199726";
  const email = "livemoroccotour01@gmail.com";
 
  // Remonter en haut de la page à chaque changement d'URL
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Composant animé
  const AnimatedSection = ({ children, id }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);
    useEffect(() => {
      const container = document.querySelector(".img_contact");
      if (container) {
        const second = container.children[1]; // le 2ème social
        const offset = second.offsetLeft - (container.clientWidth / 2) + (second.clientWidth / 2);
        container.scrollTo({ left: offset, behavior: "smooth" });
      }
    }, []);

    const variants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
      <motion.div
        id={id}
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        {children}
      </motion.div>
    );
  };
  useEffect(() => {
    document.title = "Contact - Live Morocco Tour";
    const metaDescription = document.createElement('meta');
    metaDescription.name = "description";
    metaDescription.content = "Contact Live Morocco Tour to book your Moroccan desert tour. Available on WhatsApp, Instagram, and TripAdvisor.";
    document.head.appendChild(metaDescription);

    return () => {
        document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <>
      {/* Section Slider */}
      <AnimatedSection id="slider">
        <div className="slider_contact">
          <h2>{t("slider_h2")}</h2>
          <h1>{t("slider_h1")}</h1>
          <h3>{t("slider_h3")}</h3>
        </div>
      </AnimatedSection>

      {/* Section Contact Top */}
      <AnimatedSection id="contactTop">
        <div className="contact_top">
          <h1>{t("titre")}</h1>
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
        </div>
      </AnimatedSection>

      {/* Section Message Contact */}
      <AnimatedSection id="msgContact">
        <div className="contactUs">
            <div className="GetInTouch">
              <h2>{t("touch")}</h2>
              <a href={`tel:${phoneNumber1}`}> <FaPhone />  {phoneNumber1}</a><br />
              <a href={`mailto:${email}`}> <FaEnvelope /> {email}</a><br />
              <h2> {t("bookingP")}</h2>
              <p>
                <strong>{t("info1", { returnObjects: true })[0]}</strong>
                {" "}{t("info1", { returnObjects: true })[1]}
              </p>
              <h2>{t("booking")}</h2>
              <p>
                <strong>{t("info2", { returnObjects: true })[0]}</strong>
                {" "}{t("info2", { returnObjects: true })[1]}
              </p>

              <ul>
                <li>{t("paypal")}</li>
              </ul>
              <p>{t("bank")}</p>
            </div>
            <div className="sendM">
              <h2>{t("send")}</h2>
              <ContactForm />
            </div>
        </div>
      </AnimatedSection>

      {/* Section Social Contact */}
      <AnimatedSection id="socialContact">
        <div className="social_contact">
          <h3>{t("social")}</h3> 
          <div className="img_contact">
            <div className="social">
              <a href="https://www.instagram.com/moroccan_trails1/" target="_blank">
                <p><FaInstagram /> @live_morocco_tour</p>
              </a>
              <img src={contact2} alt="live_morocco_tour" />
            </div>
            <div className="social">
              <a href="https://www.facebook.com/profile.php?id=61584734673978" target="_blank">
                <p><FaFacebook /> @live_morocco_tour</p>
              </a>
              <img src={contact1} alt="live_morocco_tour" />
            </div>
            <div className="social">
              <a href={`https://wa.me/${phoneNumber1}`} target="_blank" rel="noopener noreferrer">
                <p><FaWhatsapp /> @live_morocco_tour</p>
              </a>
              <img src={contact3} alt="live_morocco_tour" />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Section Footer Contact */}
      <AnimatedSection id="footerContact">
        <div className="footer_contact">
          <h2>{t("join")}</h2>
          <NewsletterForm />
        </div>
      </AnimatedSection>
    </>
  );
};

export default Contact;
