import React from 'react';
import styles from './CardList.module.css';

export interface Card {
  id: string;
  title: string;
  description?: string;
  image?: string;
}

export interface CardListProps {
  cards: Card[];
  onCardClick?: (card: Card) => void;
  className?: string;
}

export const CardList: React.FC<CardListProps> = ({
  cards,
  onCardClick,
  className = '',
}) => {
  return (
    <div className={`${styles.cardList} ${className}`}>
      {cards.map((card) => (
        <div
          key={card.id}
          className={styles.card}
          onClick={() => onCardClick?.(card)}
        >
          {card.image && (
            <img src={card.image} alt={card.title} className={styles.image} />
          )}
          <div className={styles.content}>
            <h3 className={styles.title}>{card.title}</h3>
            {card.description && (
              <p className={styles.description}>{card.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};


