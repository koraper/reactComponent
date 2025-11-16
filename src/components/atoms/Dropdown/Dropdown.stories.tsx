import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Atoms/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const defaultOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select an option',
  },
};

export const WithLabel: Story = {
  args: {
    options: defaultOptions,
    label: 'Choose an option',
    placeholder: 'Select...',
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: defaultOptions,
    value: '2',
    label: 'Selected Option',
  },
};

export const WithIcons: Story = {
  args: {
    options: [
      { value: 'home', label: 'Home', icon: '🏠' },
      { value: 'settings', label: 'Settings', icon: '⚙️' },
      { value: 'profile', label: 'Profile', icon: '👤' },
      { value: 'logout', label: 'Logout', icon: '🚪' },
    ],
    placeholder: 'Select a menu item',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: '1', label: 'Available Option 1' },
      { value: '2', label: 'Disabled Option', disabled: true },
      { value: '3', label: 'Available Option 2' },
      { value: '4', label: 'Another Disabled', disabled: true },
    ],
    placeholder: 'Select an option',
  },
};

export const Small: Story = {
  args: {
    options: defaultOptions,
    size: 'sm',
    placeholder: 'Small dropdown',
  },
};

export const Large: Story = {
  args: {
    options: defaultOptions,
    size: 'lg',
    placeholder: 'Large dropdown',
  },
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    disabled: true,
    placeholder: 'Disabled dropdown',
  },
};

export const WithError: Story = {
  args: {
    options: defaultOptions,
    error: 'Please select an option',
    label: 'Required Field',
    placeholder: 'Select...',
  },
};

export const FullWidth: Story = {
  args: {
    options: defaultOptions,
    fullWidth: true,
    placeholder: 'Full width dropdown',
  },
};

export const LongList: Story = {
  args: {
    options: Array.from({ length: 20 }, (_, i) => ({
      value: `${i + 1}`,
      label: `Option ${i + 1}`,
    })),
    placeholder: 'Select from many options',
  },
};
