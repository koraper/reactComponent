import React from 'react';
import { Header, HeaderProps } from '../../organisms/Header';
import styles from './PageLayout.module.css';

export interface PageLayoutProps {
  header?: HeaderProps;
  children: React.ReactNode;
  className?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  header,
  children,
  className = '',
}) => {
  return (
    <div className={`${styles.pageLayout} ${className}`}>
      {header && <Header {...header} />}
      <main className={styles.main}>{children}</main>
    </div>
  );
};


