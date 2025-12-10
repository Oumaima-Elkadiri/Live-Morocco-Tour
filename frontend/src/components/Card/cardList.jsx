import React from 'react';
import Card from './card';
import { useTranslation } from 'react-i18next';
import '../../styles/cardList.css';

const CardList = ({ items, className }) => {
  const { t } = useTranslation();

  return (
    <div className={`card-list ${className}`}>
      {items.map((item, index) => {

        // 🔥 La première image du tableau JSON
        const imageUrl =
          item.images && item.images.length > 0 ? item.images[0] : null;

        return (
          <Card
            key={index}
            title={t(item.titre)}
            duration={t(item.durre)}
            image={imageUrl}   // 🔥 ne pas traduire l’image
            type={t(item.to)}
            from={t(item.departure, { ns: item.namespace })}
            item={item}
          />
        );
      })}
    </div>
  );
};

export default CardList;
