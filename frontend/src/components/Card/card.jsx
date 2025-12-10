import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaStar, FaBolt } from 'react-icons/fa'; // Importez les icônes
import img1 from "../../assets/images/img_hero/1.jpeg";
import img12 from "../../assets/images/img_hero/12.jpeg";
import img61 from "../../assets/images/img_hero/61.jpeg";
import img62 from "../../assets/images/img_hero/62.jpeg";
import img82 from "../../assets/images/img_hero/82.jpeg";
import img39 from "../../assets/images/img_hero/39.jpeg";
const Card = ({ title, duration, image, type, from, item }) => {
  const imgs = {
    img1,
    img12,
    img61,
    img62,
    img82,
    img39
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/details', { state: { item } });
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