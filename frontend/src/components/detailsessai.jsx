import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaBookmark,
  FaInstagram,
  FaEye,
  FaClock,
  FaCar,
  FaBinoculars,
  FaComments,
  FaQuestion
} from 'react-icons/fa';
import '../styles/detailsessai.css';

import profil_4 from '../assets/images/profil/profil_4.jpg';
import profil_5 from '../assets/images/profil/profil_5.jpg';
import profil_6 from '../assets/images/profil/profil_6.jpg';
import profil_7 from '../assets/images/profil/profil_7.jpg';
import profil_8 from '../assets/images/profil/profil_8.jpg';
import profil_9 from '../assets/images/profil/profil_9.jpg';
import profil_10 from '../assets/images/profil/profil_10.jpg';
import profil_11 from '../assets/images/profil/profil_11.jpg';
import profil_12 from '../assets/images/profil/profil_12.jpg';
import profil_13 from '../assets/images/profil/profil_13.jpg';
import profil_14 from '../assets/images/profil/profil_14.jpg';
import profil_15 from '../assets/images/profil/profil_15.jpg';
import profil_16 from '../assets/images/profil/profil_16.jpg';
import profil_17 from '../assets/images/profil/profil_17.jpg';
import profil_18 from '../assets/images/profil/profil_18.jpg';
import profil_19 from '../assets/images/profil/profil_19.jpg';
import profil_20 from '../assets/images/profil/profil_20.jpg';
import profil_21 from '../assets/images/profil/profil_21.jpg';
import profil_22 from '../assets/images/profil/profil_22.jpg';
import profil_23 from '../assets/images/profil/profil_23.jpg';
import profil_24 from '../assets/images/profil/profil_24.jpg';
import profil_25 from '../assets/images/profil/profil_25.jpg';
import profil_26 from '../assets/images/profil/profil_26.jpg';
import profil_27 from '../assets/images/profil/profil_27.jpg';
import profil_28 from '../assets/images/profil/profil_28.jpg';
import profil_29 from '../assets/images/profil/profil_29.jpg';
import profil_30 from '../assets/images/profil/profil_30.jpg';
import profil_31 from '../assets/images/profil/profil_31.jpg';
import profil_32 from '../assets/images/profil/profil_32.jpg';
import profil_33 from '../assets/images/profil/profil_33.jpg';
import profil_34 from '../assets/images/profil/profil_34.jpg';
import profil_35 from '../assets/images/profil/profil_35.jpg';
import profil_36 from '../assets/images/profil/profil_36.jpg';
import profil_37 from '../assets/images/profil/profil_37.jpg';
import profil_38 from '../assets/images/profil/profil_38.jpg';
import profil_39 from '../assets/images/profil/profil_39.jpg';
import profil_40 from '../assets/images/profil/profil_40.jpg';
import profil_41 from '../assets/images/profil/profil_41.jpg';
import profil_42 from '../assets/images/profil/profil_42.jpg';
import profil_43 from '../assets/images/profil/profil_43.jpg';

import img1 from "../assets/images/img_hero/1.jpeg";
import img2 from "../assets/images/img_hero/2.jpeg";
import img3 from "../assets/images/img_hero/3.jpeg";
import img4 from "../assets/images/img_hero/4.jpeg";
import img5 from "../assets/images/img_hero/5.jpeg";
import img7 from "../assets/images/img_hero/7.jpeg";
import img9 from "../assets/images/img_hero/9.jpeg";
import img10 from "../assets/images/img_hero/10.jpeg";
import img12 from "../assets/images/img_hero/12.jpeg";
import img13 from "../assets/images/img_hero/13.jpeg";
import img16 from "../assets/images/img_hero/16.jpeg";
import img19 from "../assets/images/img_hero/19.jpeg";
import img22 from "../assets/images/img_hero/22.jpeg";
import img25 from "../assets/images/img_hero/25.jpeg";
import img27 from "../assets/images/img_hero/27.jpeg";
import img28 from "../assets/images/img_hero/28.jpeg";
import img30 from "../assets/images/img_hero/30.jpeg";
import img31 from "../assets/images/img_hero/31.jpeg";
import img35 from "../assets/images/img_hero/35.jpeg";
import img36 from "../assets/images/img_hero/36.jpeg";
import img39 from "../assets/images/img_hero/39.jpeg";
import img40 from "../assets/images/img_hero/40.jpeg";
import img42 from "../assets/images/img_hero/42.jpeg";
import img45 from "../assets/images/img_hero/45.jpeg";
import img47 from "../assets/images/img_hero/47.jpeg";
import img48 from "../assets/images/img_hero/48.jpeg";
import img50 from "../assets/images/img_hero/50.jpeg";
import img51 from "../assets/images/img_hero/51.jpeg";
import img52 from "../assets/images/img_hero/52.jpeg";
import img53 from "../assets/images/img_hero/53.jpeg";
import img57 from "../assets/images/img_hero/57.jpeg";
import img58 from "../assets/images/img_hero/58.jpeg";
import img59 from "../assets/images/img_hero/59.jpeg";
import img61 from "../assets/images/img_hero/61.jpeg";
import img62 from "../assets/images/img_hero/62.jpeg";
import img70 from "../assets/images/img_hero/70.jpeg";
import img79 from "../assets/images/img_hero/79.jpeg";
import img82 from "../assets/images/img_hero/82.jpeg";
import img84 from "../assets/images/img_hero/84.jpeg";

import ContactForm from "./ContactForm";

const AnimatedSection = ({ children, id }) => {
  return <div id={id}>{children}</div>;
};

const DetailsEssai = () => {
  const { t } = useTranslation(["tours_lists", "dayTripsList", "contact"]);
  const location = useLocation();
  const id = location.state?.id;

  const heroImages = {
    img1, img2, img3, img4, img5, img7, img9, img10, img12, img13,
    img16, img19, img22, img25, img27, img28, img30, img31, img35,
    img36, img39, img40, img42, img45, img47, img48, img50, img51,
    img52, img53, img57, img58, img59, img61, img62, img70, img79,
    img82, img84
  };

  const profilImages = {
    profil_4, profil_5, profil_6, profil_7, profil_8, profil_9, profil_10,
    profil_11, profil_12, profil_13, profil_14, profil_15, profil_16,
    profil_17, profil_18, profil_19, profil_20, profil_21, profil_22,
    profil_23, profil_24, profil_25, profil_26, profil_27, profil_28,
    profil_29, profil_30, profil_31, profil_32, profil_33, profil_34,
    profil_35, profil_36, profil_37, profil_38, profil_39, profil_40,
    profil_41, profil_42, profil_43
  };

  // 🔥 Récupération de toutes les données (dans la langue actuelle)
  const safeToursList = t("tours_lists:tours_lists", { returnObjects: true });
  const safeDayTrips = t("dayTripsList:tours_Lists", { returnObjects: true });

  const toursList = Array.isArray(safeToursList) ? safeToursList : [];
  const dayTripsList = Array.isArray(safeDayTrips) ? safeDayTrips : [];

  const allTours = [
    ...toursList.flatMap(item => item.tours),
    ...dayTripsList.flatMap(item => item.tours)
  ];

  const tour = allTours.find(t => t.id === id);

  const [openDay, setOpenDay] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleDay = idx => {
    if (window.innerWidth >= 1024) return;
    setOpenDay(openDay === idx ? null : idx);
  };

  const toggleFAQ = idx => {
    setOpenFAQ(openFAQ === idx ? null : idx);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!tour) {
    return <h2 style={{ padding: "40px" }}>Tour not found</h2>;
  }

  return (
    <>
      <AnimatedSection id="hero">
        <div className="hero-section">
          <h3>{tour.departure}</h3>
          <h1>{tour.titre}</h1>
          <div className="hero-icons">
            <p><FaClock /> {tour.durre}</p>
            <p><FaBookmark /> DESERT TOURS</p>
          </div>
        </div>
      </AnimatedSection>

      <div className="details-page">
        <AnimatedSection id="heroImage">
          <div className="hero-images-wrapper" id="heroScroll">
            <section className="hero-images-section">
              {tour.images.map((img, i) => (
                <img key={i} src={heroImages[img]} alt="tour" />
              ))}
            </section>
          </div>
        </AnimatedSection>

        <div className="content">
          <AnimatedSection id="description">
            <div className="main-content">

              {/* COLONNE GAUCHE */}
              <div className="informations">
                <div className="about">
                  <h3>{tour.about.entete}</h3>
                  <h2><FaEye /> {tour.about.titre}</h2>
                  <div dangerouslySetInnerHTML={{ __html: tour.about.paragraph1 }} />
                  <div dangerouslySetInnerHTML={{ __html: tour.about.paragraph2 }} />
                </div>

                <div className="programme">
                  <h2><FaCar /> {tour.programme.titre}</h2>
                  <h3>{tour.programme.soustitre}</h3>

                  <div className="days">
                    {tour.programme.jours.map((jour, idx) => (
                      <div className={`day ${openDay === idx ? "open" : ""}`} key={idx}>
                        <h3 className="day-title" onClick={() => toggleDay(idx)}>
                          <span className="toggle-icon">{openDay === idx ? "−" : "+"}</span>
                          <span dangerouslySetInnerHTML={{ __html: jour.jour }} />
                        </h3>

                        {jour.text.map((txt, i) => (
                          <p key={i} dangerouslySetInnerHTML={{ __html: txt }} />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="infos">
                  <h2><FaBinoculars /> {tour.infos.titre}</h2>
                  <h3>{tour.infos.soustitre}</h3>

                  <div className="prices">
                    <h3>{tour.infos.price.titreIncludes}</h3>
                    <ul>
                      {tour.infos.price.includes.map((inc, i) => (
                        <li key={i}>{inc}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="prices">
                    <h3>{tour.infos.price.titreNotIncludes}</h3>
                    <ul>
                      {tour.infos.price.notIncludes.map((exc, i) => (
                        <li key={i}>{exc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* COLONNE DROITE */}
              <div className="column-right">
                <div className="share">
                  <h4>{t("contact:share")}</h4>
                  <FaInstagram />
                </div>

                <div className="formulaire">
                  <h3>{t("contact:heroForm")}</h3>
                  <ContactForm />
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection id="notes">
            <div className="important-notes">
              <p>
                <span dangerouslySetInnerHTML={{ __html: tour.infos.price.important.titre }} />
                <span dangerouslySetInnerHTML={{ __html: tour.infos.price.important.text }} />
              </p>
              <p>
                <span dangerouslySetInnerHTML={{ __html: tour.infos.price.priceText.titre }} />
                <span dangerouslySetInnerHTML={{ __html: tour.infos.price.priceText.text }} />
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection id="avis">
            <div className="reviews">
              <h2><FaComments /> {tour.reviews.titre}</h2>

              <div className="reviews-scroll-wrapper" id="reviewScroll">
                <section className="reviews-scroll-section">
                  {tour.reviews.listes.map((review, index) => (
                    <div className="review-box" key={index}>
                      <div className="heroReviews">
                        <img src={profilImages[review.img]} alt="" />
                        <h3>{review.name}</h3>
                      </div>

                      <div className="etoiles">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <span key={i} className="star">★</span>
                        ))}
                        {Array.from({
                          length: 5 - review.rating
                        }).map((_, i) => (
                          <span key={i} className="star off">★</span>
                        ))}
                      </div>

                      <p>{review.comment}</p>
                    </div>
                  ))}
                </section>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection id="facks">
            <div className="facks">
              <h2><FaQuestion /> {tour.faqs.titre}</h2>

              <ul className="ulFaqs">
                {tour.faqs.listes.map((liste, index) => (
                  <li key={index} className="faq-item">
                    <div className="faq-header" onClick={() => toggleFAQ(index)}>
                      <span className="faq-icon">{openFAQ === index ? "−" : "+"}</span>
                      <span className="question">{liste.question}</span>
                    </div>

                    {openFAQ === index && (
                      <div className="faq-answer">
                        {liste.repense && <p>{liste.repense}</p>}

                        {liste.listeRep && (
                          <ul>
                            {liste.listeRep.map((it, i) => (
                              <li key={i}>{it}</li>
                            ))}
                          </ul>
                        )}

                        {liste.text &&
                          liste.text.map((txt, i) => (
                            <p key={i}>{txt}</p>
                          ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
};

export default DetailsEssai;
