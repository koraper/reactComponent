import React, { useState } from 'react';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import styles from './SearchInput.module.css';

export interface SearchInputProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Search...',
  onSearch,
  className = '',
}) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.searchInput} ${className}`}>
      <div className={styles.inputWrapper}>
        <Icon name="search" size={20} className={styles.icon} />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={styles.input}
        />
      </div>
      <Button type="submit" size="md">
        Search
      </Button>
    </form>
  );
};


