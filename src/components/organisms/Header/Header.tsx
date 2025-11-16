import React from 'react';
import { Button } from '../../atoms/Button';
import { Navigation } from './components/Navigation';
import { UserMenu } from './components/UserMenu';
import styles from './Header.module.css';

export interface HeaderProps {
  logo?: React.ReactNode;
  navigationItems?: Array<{ label: string; href: string }>;
  user?: { name: string; avatar?: string };
  onLogin?: () => void;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  navigationItems = [],
  user,
  onLogin,
  className = '',
}) => {
  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.container}>
        <div className={styles.logo}>{logo || 'Logo'}</div>
        {navigationItems.length > 0 && (
          <Navigation items={navigationItems} />
        )}
        <div className={styles.actions}>
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Button variant="primary" onClick={onLogin}>
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};


