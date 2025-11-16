import { ReactNode } from 'react';

export interface DropdownOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  onChange?: (value: string | number) => void;
  className?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
