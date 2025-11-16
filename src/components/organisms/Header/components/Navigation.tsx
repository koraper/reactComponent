import React from 'react';
import styles from './Navigation.module.css';

export interface NavigationProps {
  items: Array<{ label: string; href: string }>;
}

export const Navigation: React.FC<NavigationProps> = ({ items }) => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.href} className={styles.item}>
            <a href={item.href} className={styles.link}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};


