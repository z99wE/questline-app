import { render, screen, fireEvent } from '@testing-library/react';
import PixelButton from './PixelButton';
import { describe, it, expect, vi } from 'vitest';

describe('PixelButton', () => {
  it('renders children correctly', () => {
    render(<PixelButton>Click Me</PixelButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<PixelButton onClick={handleClick}>Click Me</PixelButton>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies the correct variant class', () => {
    const { container } = render(<PixelButton variant="danger">Danger</PixelButton>);
    const button = container.firstChild;
    expect(button).toHaveClass('bg-quest-red');
  });
});
