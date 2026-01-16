import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import "../i18n";
import about from '../assets/images/about1.jpeg';
import mission from '../assets/images/about2.jpeg';
import exemple1 from '../assets/images/about3.jpeg'; 
import exemple2 from '../assets/images/about4.jpeg';
import profil_1 from '../assets/images/profil/boys/profil_2.jpg';
import inconu from '../assets/images/profil/inconu.jpg';
import profil_2 from '../assets/images/profil/boys/profil_3.jpg';
import '../styles/about.css';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import NewsletterForm from './NewsletterForm';

const About = () => {
  const comments = {profil_1, inconu, profil_2};
  const exemples = {exemple1, exemple2};
  const { t } = useTranslation(["about", "nav"]);
  const location = useLocation();
  const slider = t("about:slider", { returnObjects: true });
  const aboutText = t("about:about_text", { returnObjects: true });
  const listAim = t("about:mission_text.list", { returnObjects: true });
  const whyUsArguments = t("about:whyUs.arguments", { returnObjects: true });
  const safeComments = t("about:reviews.comments", {returnObjects: true});

  useEffect(() => {
    // Remonter en haut de la page
    window.scrollTo(0, 0);
  }, [location.pathname]); // Déclencher à chaque changement d'URL
  // Composant animé
  const AnimatedSection = ({ children, id, direction = "left" }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    const variants = {
      hidden: { opacity: 0, x: direction === "left" ? -50 : 50 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };
    useEffect(() => {
      document.title = "About - Live Morocco Tour";
      const metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      metaDescription.content = "Find out who we are and why we are the best choice for your Merzouga desert adventures.";
      document.head.appendChild(metaDescription);
  
      return () => {
          document.head.removeChild(metaDescription);
      };
    }, []);

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
  return (
    <>
      {/* Section Slider */}
      <AnimatedSection id="slider">
        <div className="slider_about">
          <h2>{slider[0]}</h2>
          <h1>{slider[1]}</h1>
          <h3>{slider[2]}</h3>
        </div>
      </AnimatedSection>

      {/* Section Info 1 */}
      <AnimatedSection id="info1" direction="right">
        <div className="info_about">
          <div className="text_about">
            <h1>{t("about:about_title")}</h1>
            {aboutText.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>
          <img src={about} alt="About" />
        </div>
      </AnimatedSection>

      {/* Section Info 2 */}
      <AnimatedSection id="info2" direction="left">
        <div className="info_about">
          <img src={mission} alt="Mission" className="img1" />
          <div className="text_about1">
            <h1>{t("about:mission_title")}</h1>
            <p>{t("about:mission_text.text")}</p>
            <h2>{t("about:mission_text.title")}</h2>
            <ul>
              {listAim.map((aim, index) => (
                <li key={index}>{aim}</li>
              ))}
            </ul>
            <p>{t("about:mission_text.end")}</p>
          </div>
        </div>
        <div className="ligne"></div>
      </AnimatedSection>
        
      {/* Section Info 3 */}
      <AnimatedSection id="info3" direction="right">
        <div className="info_why">
          <div className="text_about">
            <h1>{t("about:whyUs.choose_title")}</h1>
            <p>{t("about:whyUs.choose_text")}</p>
            {whyUsArguments.map((whyUsArgument, index) => (
              <div key={index} className="argument">
                <h2>{whyUsArgument.title}</h2>
                <p>{whyUsArgument.text}</p>
                {Array.isArray(whyUsArgument.exemple) && whyUsArgument.exemple.length > 0 && (
                  <div className="argument-examples">
                    {whyUsArgument.exemple.map((ex, i) => (
                      <div key={i} className="example">
                        <h4>{ex.title}</h4>
                        <img src={exemples[ex.photo]} alt={ex.title} />
                        <p>{ex.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="ligne"></div>
      </AnimatedSection>

      {/* Section comments */}
      <AnimatedSection id="comments">
        <div className="comments_about">
          <h1>{t("about:reviews.title")}</h1>
          {/* Liste des commentaires */}
          <div className="comments">
            {safeComments.map((comment, index) => (
              <div className="comment" key={index}>
                <div className="user">
                  <img src={comments[comment.image]} alt={comment.name} className="user-img" />
                  <div className="user-info">
                    <h4 className="name">{comment.name}</h4>
                    <span className="pays">{comment.pays}</span>
                    <div className="stars">★★★★★</div>
                  </div>
                </div>
                <p className="message">“{comment.message}”</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
      <AnimatedSection id="newsletter">
          <div className="newsletter">
              <h1>{t("about:NewsLetter")}</h1>
              <NewsletterForm />
          </div>
      </AnimatedSection>
    </>
  );
}; 

export default About;