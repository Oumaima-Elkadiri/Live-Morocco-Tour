import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaStar, FaBolt } from 'react-icons/fa'; // Importez les icônes
import img1 from "../../assets/images/img_hero/1.jpeg";
import img12 from "../../assets/images/img_hero/12.jpeg";
import img61 from "../../assets/images/img_hero/61.jpeg";
import img62 from "../../assets/images/img_hero/62.jpeg";
import img82 from "../../assets/images/img_hero/82.jpeg";
import img39 from "../../assets/images/img_hero/39.jpeg";
import img93 from "../../assets/images/img_hero/93.jpg";
import img5 from "../../assets/images/img_hero/5.jpeg";
import img101 from "../../assets/images/img_hero/101.jpg";
import img97 from "../../assets/images/img_hero/97.jpg";
import img22 from "../../assets/images/img_hero/22.jpeg";
import img102 from "../../assets/images/img_hero/102.jpg";
import img121 from "../../assets/images/img_hero/121.jpg";
import img127 from "../../assets/images/img_hero/127.jpg";
import img113 from "../../assets/images/img_hero/113.jpg";
import img106 from "../../assets/images/img_hero/106.jpg";

const Card = ({ title, duration, image, type, from, item }) => {
  const imgs = {
    img1, 
    img12,
    img61,
    img62,
    img82,
    img39,
    img93,
    img5,
    img101,
    img97,
    img22,
    img102,
    img121,
    img127,
    img113,
    img106
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/details', { state: { id: item.id} });
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    "name": title,
    "duration": duration,
    "image": image,
  };
  return (
    <div className="card" onClick={handleClick}>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* ==== Image + overlay + badge ==== */}
      <div className="card-image-container">
        <img src={imgs[image]} alt={title} className="card-image" />
        <div className="image-overlay"></div> {/* Filtre noir avec opacité */}
        <div className="card-duration-badge">{duration}</div>
      </div>

      {/* ==== Contenu texte ==== */}
      <div className="card-content">
        <div className='title'>
          <FaBolt className='icon' /><h3 className="card-title">{title}</h3>
        </div>

        {/* ==== Footer avec infos ==== */}
        <div className="footerCard">
          <p className="card-duration">
            <FaClock className='icon'/> {duration}
          </p>
          <p className="card-type">
            <FaStar className='icon' /> {from}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;