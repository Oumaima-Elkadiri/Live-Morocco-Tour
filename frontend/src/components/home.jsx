import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom'; // Importez useLocation
import '../i18n'; 
import about_img from '../assets/images/img_about.jpg';

import profil_1 from '../assets/images/profil/girls/profil_1.jpg';
import profil_2 from '../assets/images/profil/boys/profil_1.jpg';
import profil_3 from '../assets/images/profil/girls/profil_2.jpg';

import { MapPinned, Users, ShieldCheck, Star} from "lucide-react";
import '../styles/home.css';
import { Link } from 'react-router-dom'; 
import CardList from "./Card/cardList";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGlobe, FaFacebookF } from "react-icons/fa";
import { MdTravelExplore } from "react-icons/md";

const Home = () => {
  const { t } = useTranslation(["slider", "nav", "services", "about", "why", "tours", "discover", "avis", "adventure", "footer", "dayTripsList", "tours_lists"]);
  const [mixedData, setMixedData] = useState([]);
  const location = useLocation(); // Utilisez useLocation pour surveiller les changements d'URL
  const navigate = useNavigate();
  
  // Fonction pour mélanger les données
 const { i18n } = useTranslation();

useEffect(() => {
  const fetchData = async () => {
    try {
      const lang = i18n.language;
      const toursRes = await fetch(`/locales/${lang}/tours_lists.json`);
      const dayTripsRes = await fetch(`/locales/${lang}/dayTripsList.json`);

      const toursJson = await toursRes.json();
      const dayTripsJson = await dayTripsRes.json();

      const toursFlattened = toursJson.tours_lists.flatMap(group => group.tours);

      const dayTripsFlattened = dayTripsJson.dayTripsList
        ? dayTripsJson.dayTripsList.flatMap(group => group.tours || group)
        : [];

      const allData = [...toursFlattened, ...dayTripsFlattened];
      const shuffledData = allData.sort(() => Math.random() - 0.5);

      setMixedData(shuffledData.slice(0, 6));
    } catch (error) {
      console.error("Erreur lors du chargement des tours:", error);
    }
  };

  fetchData();
}, [i18n.language]);


  const icons = [MapPinned, Users, ShieldCheck, Star];
  const reasons = t("why:reasons", { returnObjects: true });

  const comments = t("avis:comments", { returnObjects: true });
  const safeComments = Array.isArray(comments) ? comments : [];
  const imageMap = {
    profil_1,
    profil_2,
    profil_3
  };
  // Remonter en haut de la page à chaque changement d'URL
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Composant Section avec animation
  const Section = ({ children, id }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

  // 🔹 Ajout du useEffect pour le SEO
  useEffect(() => {
    document.title = "Home - Live Morocco Tour";
    const metaDescription = document.createElement('meta');
    metaDescription.name = "description";
    metaDescription.content = "Discover LIVE MOROCCO TOUR, your expert in camel treks and excursions in the Moroccan desert.";
    document.head.appendChild(metaDescription);

    return () => {
      // Nettoyer la balise meta lors du démontage du composant
      document.head.removeChild(metaDescription);
    };
  }, []);
    return (
      <motion.div
        id={id}
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
        }}
      >
        {children}
      </motion.div>
    );
  };
  const aboutText = t("about:text", { returnObjects: true });
  return (
    <> 
      {/* Section Home */}
      <Section id="home"> 
        <div className="home-section">
          <h1>{t("home:title")}</h1>
          <h2>{t("home:subtitle")}</h2>
          <p>{t("home:text")}</p>
          <div className="actions">
            <button onClick={() => navigate("/contact")}>{t("home:button1")}</button>
            <button
              onClick={() =>
                window.open(
                  "https://www.tripadvisor.com/Attraction_Review-g304017-d33032002-Reviews-Moroccan_Trails-Merzouga_Draa_Tafilalet.html",
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

<div className='page-container'>

      {/* Section About */}
      <Section id="about">
        <div className="about">
          <div className="content_about">
            <div className="info">
              <p dangerouslySetInnerHTML={{ __html: aboutText }} />
            </div>
            <img src={about_img} alt="about_img" className="img1" />
            
          </div>
        </div>
      </Section>

      {/* Section Discover */}
      <Section id="discover">
        <div className="discover">
          <div className="title_discover">
            <h1>{t("discover:title")}</h1>
            <p>{t("discover:subtitle")}</p>
          </div>

          <div className="from">
            {/* Ligne 1 : 4 premières cards */}
            <div className="row first-row-container">
              {t("discover:cards_from", { returnObjects: true })
                .slice(0, 4)
                .map((card, index) => (
                  <div key={index} className="card first-row">
                    <h3>{card.title_from}</h3>
                    <p>{card.description}</p>
                    <span className="tooltip">{card.description}</span> {/* pour responsive */}
                  </div>
                ))}
            </div>

            {/* Ligne 2 : 2 dernières cards */}
            <div className="row second-row-container">
              {(Array.isArray(t("discover:cards_from", { returnObjects: true }))
                ? t("discover:cards_from", { returnObjects: true })
                : []
              )
                .slice(4)
                .map((card, index) => (
                  <div key={index} className="card second-row">
                    <h3>{card.title_from}</h3>
                    <span className="tooltip">{card.description}</span>
                  </div>
                ))}
            </div>

          </div>
        </div>
      </Section>




      {/* Section Tours */}
      <Section id="tours">
        <div className="tours">
          <div className="top_tours">
            <h1>{t("tours:titre1")}</h1>
            <h3>{t("tours:titre2")}</h3>
            <p className='infos_tours'>{t("tours:texte")}</p>
          </div>
          
          <div className="mix">
            <CardList items={mixedData} className="card-list-home" />
          </div>
        </div>
      </Section>

</div>
      {/* Section Why */}
      <Section id="why">
        <div className="why">
          <div className="text">
            <h1>{t("why:question")}</h1>
            <p>{t("why:repense")}</p>
            <div className="reasons">
              {reasons.map((reason, i) => {
                const Icon = icons[i];
                return (
                  <div className="reason" key={i}>
                    <Icon className='icon' size={36} color="#c97a03" />
                    <h3>{reason.title}</h3>
                    <p>{reason.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>
<div className='page-container'>
      {/* Section avis */}
      <Section id="avis">
        <div className="avis">
          <h1>{t("avis:avis_title")}</h1>
          <p>{t("avis:avis_text")}</p>

          {/* Liste des commentaires */}
          <div className="comments">
            {safeComments.map((comment, index) => (
              <div className="comment" key={index}>
                <div className="stars">★★★★★</div>
                <p className="message">“{comment.message}”</p>
                <div className="user">
                  <img src={imageMap[comment.image]} alt={comment.name} className="user-img" />
                  <div className="user-info">
                    <h4 className="name">{comment.name}</h4>
                    <span className="pays">{comment.pays}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Nouvelle section statistique et liens */}
          <div className="avis-footer">
            <div className="stats">
              <div className="stat">
                <h3>4.8/5</h3>
                <p>Average Rating</p>
              </div>
              <div className="stat">
                <h3>1200+</h3>
                <p>Happy Travelers</p>
              </div>
              <div className="stat">
                <h3>95%</h3>
                <p>Satisfaction Rate</p>
              </div>
            </div>

            <div className="social-links">
              <a href="https://www.livemoroccotour.com" target="_blank" rel="noopener noreferrer">
                <FaGlobe className="social-icon" />
              </a>

              <a href="https://www.facebook.com/profile.php?id=61584734673978" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="social-icon" />
              </a>

              <a href="https://www.tripadvisor.com/Attraction_Review-g304017-d33032002-Reviews-Moroccan_Trails-Merzouga_Draa_Tafilalet.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdTravelExplore className="social-icon" />
              </a>
            </div>

          </div>
        </div>
      </Section>
</div>
      <Section id="adventure">

        <div className="adventure">

          <div className="adventure-content">
            <h2>{t("adventure:adventure_title")}</h2>

            <p>{t("adventure:adventure_text")}</p>

            <div className="adventure-buttons">
              <a
                href="https://www.tripadvisor.com/Attraction_Review-g304017-d33032002-Reviews-Moroccan_Trails-Merzouga_Draa_Tafilalet.html"
                target="_blank"
                rel="noopener noreferrer"
                className="adventure-button primary"
              >
                {t("adventure:button_explore")}
              </a>

              <Link to="/contact" className="adventure-button secondary">
                {t("adventure:button_contact")}
              </Link>
            </div>

          </div>

        </div>

      </Section>

    </> 
  );
};

export default Home;
