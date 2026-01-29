import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../i18n";

import about_img from "../assets/images/img_about.jpg";

import profil_1 from "../assets/images/profil/girls/profil_1.jpg";
import profil_2 from "../assets/images/profil/boys/profil_1.jpg";
import profil_3 from "../assets/images/profil/girls/profil_2.jpg";

import { MapPinned, Users, ShieldCheck, Star } from "lucide-react";
import { FaGlobe, FaFacebookF } from "react-icons/fa";
import { MdTravelExplore } from "react-icons/md";

import CardList from "./Card/cardList";
import "../styles/home.css";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const { t, i18n } = useTranslation([
    "home",
    "about",
    "why",
    "tours",
    "discover",
    "avis",
    "adventure",
    "tours_lists",
    "dayTripsList",
  ]);

  const [mixedData, setMixedData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  /* ================= SEO ================= */
  useEffect(() => {
    document.title = "Home - Live Morocco Tour";

    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content =
      "Discover Live Morocco Tour, your expert in desert tours and Moroccan adventures.";
    document.head.appendChild(meta);

    return () => document.head.removeChild(meta);
  }, []);

  /* ================= SCROLL TOP ================= */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  /* ================= FETCH TOURS ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const lang = i18n.language || "en";

        const toursRes = await fetch(`/locales/${lang}/tours_lists.json`);
        const dayTripsRes = await fetch(
          `/locales/${lang}/dayTripsList.json`
        );

        const toursJson = await toursRes.json();
        const dayTripsJson = await dayTripsRes.json();

        const toursFlattened = Array.isArray(toursJson?.tours_lists)
          ? toursJson.tours_lists.flatMap(
              (group) => group.tours || []
            )
          : [];

        const dayTripsFlattened = Array.isArray(
          dayTripsJson?.dayTripsList
        )
          ? dayTripsJson.dayTripsList.flatMap(
              (group) => group.tours || group || []
            )
          : [];

        const allData = [...toursFlattened, ...dayTripsFlattened];
        const shuffled = [...allData].sort(() => Math.random() - 0.5);

        setMixedData(shuffled.slice(0, 6));
      } catch (err) {
        console.error("Erreur chargement tours :", err);
        setMixedData([]);
      }
    };

    fetchData();
  }, [i18n.language]);

  /* ================= WHY ================= */
  const icons = [MapPinned, Users, ShieldCheck, Star];
  const reasonsRaw = t("why:reasons", { returnObjects: true });
  const reasons = Array.isArray(reasonsRaw) ? reasonsRaw : [];

  /* ================= AVIS ================= */
  const commentsRaw = t("avis:comments", { returnObjects: true });
  const comments = Array.isArray(commentsRaw) ? commentsRaw : [];

  const imageMap = {
    profil_1,
    profil_2,
    profil_3,
  };

  /* ================= SECTION ANIMATION ================= */
  const Section = ({ children, id }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
      if (inView) controls.start("visible");
    }, [controls, inView]);

    return (
      <motion.div
        id={id}
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8 },
          },
        }}
      >
        {children}
      </motion.div>
    );
  };

  const aboutText = t("about:text", { returnObjects: true });

  return (
    <>
      {/* ================= HOME ================= */}
      <Section id="home">
        <div className="home-section">
          <h1>{t("home:title")}</h1>
          <h2>{t("home:subtitle")}</h2>
          <p>{t("home:text")}</p>

          <div className="actions">
            <button onClick={() => navigate("/contact")}>
              {t("home:button1")}
            </button>

            <button
              onClick={() =>
                window.open(
                  "https://www.tripadvisor.com/Attraction_Review-g304017-d33032002",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              {t("home:button2")}
            </button>
          </div>
        </div>
      </Section>

      {/* ================= ABOUT ================= */}
      <Section id="about">
        <div className="about">
          <div className="content_about">
            <div className="info">
              <p dangerouslySetInnerHTML={{ __html: aboutText }} />
            </div>
            <img src={about_img} alt="About Live Morocco Tour" />
          </div>
        </div>
      </Section>

      {/* ================= TOURS ================= */}
      <Section id="tours">
        <div className="tours">
          <h1>{t("tours:titre1")}</h1>
          <p>{t("tours:texte")}</p>

          <CardList items={mixedData} />
        </div>
      </Section>

      {/* ================= WHY ================= */}
      <Section id="why">
        <div className="why">
          <h1>{t("why:question")}</h1>

          <div className="reasons">
            {reasons.map((reason, i) => {
              const Icon = icons[i] || Star;
              return (
                <div className="reason" key={i}>
                  <Icon size={36} />
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ================= AVIS ================= */}
      <Section id="avis">
        <div className="avis">
          <h1>{t("avis:avis_title")}</h1>

          <div className="comments">
            {comments.map((comment, i) => (
              <div className="comment" key={i}>
                <p>“{comment.message}”</p>

                <div className="user">
                  <img
                    src={imageMap[comment.image]}
                    alt={comment.name}
                  />
                  <div>
                    <strong>{comment.name}</strong>
                    <span>{comment.pays}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="social-links">
            <a
              href="https://www.livemoroccotour.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGlobe />
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61584734673978"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.tripadvisor.com/Attraction_Review-g304017-d33032002"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdTravelExplore />
            </a>
          </div>
        </div>
      </Section>

      {/* ================= ADVENTURE ================= */}
      <Section id="adventure">
        <div className="adventure">
          <h2>{t("adventure:adventure_title")}</h2>
          <p>{t("adventure:adventure_text")}</p>

          <div className="adventure-buttons">
            <a
              href="https://www.tripadvisor.com/Attraction_Review-g304017-d33032002"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("adventure:button_explore")}
            </a>

            <Link to="/contact">
              {t("adventure:button_contact")}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Home;
