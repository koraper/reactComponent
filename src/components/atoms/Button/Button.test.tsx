import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Button variant="secondary">Button</Button>);
    expect(container.firstChild).toHaveClass('secondary');
  });

  it('applies size class', () => {
    const { container } = render(<Button size="lg">Button</Button>);
    expect(container.firstChild).toHaveClass('lg');
  });

  it('shows loading state', () => {
    render(<Button isLoading>Button</Button>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('is disabled when loading', () => {
    render(<Button isLoading>Button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});


