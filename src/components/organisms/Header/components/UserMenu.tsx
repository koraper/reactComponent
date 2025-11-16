import React from 'react';
import styles from './UserMenu.module.css';

export interface UserMenuProps {
  user: { name: string; avatar?: string };
}

export const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  return (
    <div className={styles.userMenu}>
      {user.avatar && (
        <img src={user.avatar} alt={user.name} className={styles.avatar} />
      )}
      <span className={styles.name}>{user.name}</span>
    </div>
  );
};


