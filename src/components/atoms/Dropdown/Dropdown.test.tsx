import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dropdown } from './Dropdown';
import { DropdownOption } from './Dropdown.types';

const mockOptions: DropdownOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

describe('Dropdown', () => {
  it('renders with placeholder', () => {
    render(<Dropdown options={mockOptions} placeholder="Select option" />);
    expect(screen.getByText('Select option')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(
      <Dropdown options={mockOptions} label="Choose option" placeholder="Select" />
    );
    expect(screen.getByText('Choose option')).toBeInTheDocument();
  });

  it('opens dropdown menu when clicked', () => {
    render(<Dropdown options={mockOptions} placeholder="Select" />);
    const trigger = screen.getByText('Select');
    fireEvent.click(trigger);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('selects an option when clicked', () => {
    const handleChange = jest.fn();
    render(
      <Dropdown
        options={mockOptions}
        placeholder="Select"
        onChange={handleChange}
      />
    );

    const trigger = screen.getByText('Select');
    fireEvent.click(trigger);

    const option = screen.getByText('Option 2');
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith('2');
  });

  it('displays selected value', () => {
    render(<Dropdown options={mockOptions} value="2" />);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('does not open when disabled', () => {
    render(<Dropdown options={mockOptions} disabled placeholder="Select" />);
    const trigger = screen.getByText('Select');
    fireEvent.click(trigger);

    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <Dropdown
        options={mockOptions}
        error="This field is required"
        placeholder="Select"
      />
    );
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('does not select disabled options', () => {
    const handleChange = jest.fn();
    const optionsWithDisabled: DropdownOption[] = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2', disabled: true },
    ];

    render(
      <Dropdown
        options={optionsWithDisabled}
        placeholder="Select"
        onChange={handleChange}
      />
    );

    const trigger = screen.getByText('Select');
    fireEvent.click(trigger);

    const disabledOption = screen.getByText('Option 2');
    fireEvent.click(disabledOption);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('closes dropdown when clicking outside', () => {
    render(<Dropdown options={mockOptions} placeholder="Select" />);

    const trigger = screen.getByText('Select');
    fireEvent.click(trigger);

    expect(screen.getByText('Option 1')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('renders with icons', () => {
    const optionsWithIcons: DropdownOption[] = [
      { value: '1', label: 'Home', icon: '🏠' },
      { value: '2', label: 'Settings', icon: '⚙️' },
    ];

    render(<Dropdown options={optionsWithIcons} value="1" />);
    expect(screen.getByText('🏠')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
