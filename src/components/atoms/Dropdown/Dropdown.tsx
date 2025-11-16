import React, { useState, useRef, useEffect } from 'react';
import { DropdownProps } from './Dropdown.types';
import styles from './Dropdown.module.css';

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  placeholder = 'Select an option',
  disabled = false,
  error,
  label,
  onChange,
  className = '',
  fullWidth = false,
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (optionValue: string | number) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    onChange?.(optionValue);
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const containerClasses = [
    styles.container,
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const triggerClasses = [
    styles.trigger,
    styles[size],
    disabled && styles.disabled,
    error && styles.error,
    isOpen && styles.open,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses} ref={dropdownRef}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={triggerClasses} onClick={handleToggle}>
        <span className={styles.value}>
          {selectedOption?.icon && (
            <span className={styles.icon}>{selectedOption.icon}</span>
          )}
          {selectedOption?.label || placeholder}
        </span>
        <span className={styles.arrow}>▼</span>
      </div>
      {isOpen && (
        <div className={styles.menu}>
          {options.map((option) => (
            <div
              key={option.value}
              className={[
                styles.option,
                option.disabled && styles.optionDisabled,
                option.value === selectedValue && styles.optionSelected,
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => !option.disabled && handleSelect(option.value)}
            >
              {option.icon && <span className={styles.icon}>{option.icon}</span>}
              {option.label}
            </div>
          ))}
        </div>
      )}
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
