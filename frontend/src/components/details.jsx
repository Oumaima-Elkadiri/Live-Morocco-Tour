import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaBookmark,
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaEye,
  FaClock,
  FaCar,
  FaBinoculars,
  FaComments,
  FaQuestion
} from 'react-icons/fa';
import '../styles/detailsessai.css';

import girl_profil_1 from '../assets/images/profil/girls/profil_1.jpg';
import girl_profil_2 from '../assets/images/profil/girls/profil_2.jpg';
import girl_profil_3 from '../assets/images/profil/girls/profil_3.jpg';
import girl_profil_4 from '../assets/images/profil/girls/profil_4.jpg';
import girl_profil_5 from '../assets/images/profil/girls/profil_5.jpg';
import girl_profil_6 from '../assets/images/profil/girls/profil_6.jpg';
import girl_profil_7 from '../assets/images/profil/girls/profil_7.jpg';
import girl_profil_8 from '../assets/images/profil/girls/profil_8.jpg';
import girl_profil_9 from '../assets/images/profil/girls/profil_9.jpg';
import girl_profil_10 from '../assets/images/profil/girls/profil_10.jpg';
import girl_profil_11 from '../assets/images/profil/girls/profil_11.jpg';
import girl_profil_12 from '../assets/images/profil/girls/profil_12.jpg';
import girl_profil_13 from '../assets/images/profil/girls/profil_13.jpg';
import girl_profil_14 from '../assets/images/profil/girls/profil_14.jpg';
import girl_profil_15 from '../assets/images/profil/girls/profil_15.jpg';
import girl_profil_16 from '../assets/images/profil/girls/profil_16.jpg';
import girl_profil_17 from '../assets/images/profil/girls/profil_17.jpg';
import girl_profil_18 from '../assets/images/profil/girls/profil_18.jpg';
import girl_profil_19 from '../assets/images/profil/girls/profil_19.jpg';
import girl_profil_20 from '../assets/images/profil/girls/profil_20.jpg';
import girl_profil_21 from '../assets/images/profil/girls/profil_21.jpg';
import girl_profil_22 from '../assets/images/profil/girls/profil_22.jpg';
import girl_profil_23 from '../assets/images/profil/girls/profil_23.jpg';
import girl_profil_24 from '../assets/images/profil/girls/profil_24.jpg';
import girl_profil_25 from '../assets/images/profil/girls/profil_25.jpg';
import girl_profil_26 from '../assets/images/profil/girls/profil_26.jpg';

import boy_profil_1 from '../assets/images/profil/boys/profil_1.jpg';
import boy_profil_2 from '../assets/images/profil/boys/profil_2.jpg';
import boy_profil_3 from '../assets/images/profil/boys/profil_3.jpg';
import boy_profil_4 from '../assets/images/profil/boys/profil_4.jpg';
import boy_profil_5 from '../assets/images/profil/boys/profil_5.jpg';
import boy_profil_6 from '../assets/images/profil/boys/profil_6.jpg';
import boy_profil_7 from '../assets/images/profil/boys/profil_7.jpg';
import boy_profil_8 from '../assets/images/profil/boys/profil_8.jpg';
import boy_profil_9 from '../assets/images/profil/boys/profil_9.jpg';
import boy_profil_10 from '../assets/images/profil/boys/profil_10.jpg';
import boy_profil_11 from '../assets/images/profil/boys/profil_11.jpg';
import boy_profil_12 from '../assets/images/profil/boys/profil_12.jpg';
import boy_profil_13 from '../assets/images/profil/boys/profil_13.jpg';
import boy_profil_14 from '../assets/images/profil/boys/profil_14.jpg';
import boy_profil_15 from '../assets/images/profil/boys/profil_15.jpg';
import boy_profil_16 from '../assets/images/profil/boys/profil_16.jpg';

import inconu from '../assets/images/profil/inconu.jpg';

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
import img85 from "../assets/images/img_hero/85.jpg";
import img86 from "../assets/images/img_hero/86.jpg";
import img87 from "../assets/images/img_hero/87.jpg";
import img88 from "../assets/images/img_hero/88.jpg";
import img89 from "../assets/images/img_hero/89.jpg";
import img90 from "../assets/images/img_hero/90.jpg";
import img91 from "../assets/images/img_hero/91.jpg";
import img92 from "../assets/images/img_hero/92.jpg";
import img93 from "../assets/images/img_hero/93.jpg";
import img94 from "../assets/images/img_hero/94.jpg";
import img95 from "../assets/images/img_hero/95.jpg";
import img96 from "../assets/images/img_hero/96.jpg";
import img97 from "../assets/images/img_hero/97.jpg";
import img98 from "../assets/images/img_hero/98.jpg";
import img99 from "../assets/images/img_hero/99.jpg";
import img100 from "../assets/images/img_hero/100.jpg";
import img101 from "../assets/images/img_hero/101.jpg";
import img102 from "../assets/images/img_hero/102.jpg";
import img103 from "../assets/images/img_hero/103.jpg";
import img104 from "../assets/images/img_hero/104.jpg";
import img105 from "../assets/images/img_hero/105.jpg";
import img106 from "../assets/images/img_hero/106.jpg";
import img107 from "../assets/images/img_hero/107.jpg";
import img108 from "../assets/images/img_hero/108.jpg";
import img109 from "../assets/images/img_hero/109.jpg";
import img110 from "../assets/images/img_hero/110.jpg";
import img111 from "../assets/images/img_hero/111.jpg";
import img112 from "../assets/images/img_hero/112.jpg";
import img113 from "../assets/images/img_hero/113.jpg";
import img114 from "../assets/images/img_hero/114.jpg";
import img115 from "../assets/images/img_hero/115.jpg";
import img116 from "../assets/images/img_hero/116.jpg";
import img117 from "../assets/images/img_hero/117.jpg";
import img118 from "../assets/images/img_hero/118.jpg";
import img119 from "../assets/images/img_hero/119.jpg";
import img120 from "../assets/images/img_hero/120.jpg";
import img121 from "../assets/images/img_hero/121.jpg";
import img122 from "../assets/images/img_hero/122.jpg";
import img123 from "../assets/images/img_hero/123.jpg";
import img124 from "../assets/images/img_hero/124.jpg";
import img125 from "../assets/images/img_hero/125.jpg";
import img126 from "../assets/images/img_hero/126.jpg";
import img127 from "../assets/images/img_hero/127.jpg";
import img128 from "../assets/images/img_hero/128.jpg";
import img129 from "../assets/images/img_hero/129.jpg";
import img130 from "../assets/images/img_hero/130.jpg";
import img131 from "../assets/images/img_hero/131.jpg";
import img132 from "../assets/images/img_hero/132.jpg";
import img133 from "../assets/images/img_hero/133.jpg";
import img134 from "../assets/images/img_hero/134.jpg";
import img135 from "../assets/images/img_hero/135.jpg";
import img136 from "../assets/images/img_hero/136.jpg";
import img137 from "../assets/images/img_hero/137.jpg";
import img138 from "../assets/images/img_hero/138.jpg";
import img139 from "../assets/images/img_hero/139.jpg";
import img140 from "../assets/images/img_hero/140.jpg";
import img141 from "../assets/images/img_hero/141.jpg";
import img142 from "../assets/images/img_hero/142.jpg";
import img143 from "../assets/images/img_hero/143.jpg";

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
    img82, img84, img85, img86, img87, img88, img89, img90, img91,
    img92, img93, img94, img95, img96, img97, img98, img99, img100,
    img101, img102, img103, img104, img105, img106, img107, img108, img109,
    img110, img111, img112, img113, img114, img115, img116, img117, img118,
    img119, img120, img121, img122, img123, img124, img125, img126, img127,
    img128, img129, img130, img131, img132, img133, img134, img135, img136,
    img137, img138, img139, img140, img141, img142, img143
  };

const profilImages= {
  // GIRLS
  girl_profil_1, girl_profil_2, girl_profil_3, girl_profil_4, girl_profil_5,
  girl_profil_6, girl_profil_7, girl_profil_8, girl_profil_9, girl_profil_10,
  girl_profil_11, girl_profil_12, girl_profil_13, girl_profil_14, girl_profil_15,
  girl_profil_16, girl_profil_17, girl_profil_18, girl_profil_19, girl_profil_20,
  girl_profil_21, girl_profil_22, girl_profil_23, girl_profil_24, girl_profil_25,
  girl_profil_26,

  // BOYS
  boy_profil_1, boy_profil_2, boy_profil_3, boy_profil_4, boy_profil_5,
  boy_profil_6, boy_profil_7, boy_profil_8, boy_profil_9, boy_profil_10,
  boy_profil_11, boy_profil_12, boy_profil_13, boy_profil_14,
  boy_profil_15, boy_profil_16,

  // INCONNU
  inconu
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

 const tour = allTours.find(t => String(t.id) === String(id));


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
  useEffect(() => {
        document.title = "Details - Live Morocco Tour";
        const metaDescription = document.createElement('meta');
        metaDescription.name = "description";
        metaDescription.content = "Find out who we are and why we are the best choice for your Merzouga desert adventures.";
        document.head.appendChild(metaDescription);
    
        return () => {
            document.head.removeChild(metaDescription);
        };
  }, []);

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
                        <div className="ligne"></div>
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
                  <h4>{t("contact:share")}: </h4>
                  <FaInstagram />
                  <FaFacebook />
                  <FaTiktok />
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
