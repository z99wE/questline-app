import { render, screen } from '@testing-library/react';
import XpBar from './XpBar';
import { describe, it, expect } from 'vitest';

describe('XpBar', () => {
  it('renders correctly with given level and xp', () => {
    render(<XpBar currentXp={500} maxXp={1000} level={5} />);
    expect(screen.getByText('LVL 5')).toBeInTheDocument();
    expect(screen.getByText('XP: 500 / 1000')).toBeInTheDocument();
  });

  it('calculates the progress bar width correctly', () => {
    const { container } = render(<XpBar currentXp={250} maxXp={1000} level={1} />);
    const progressBar = container.querySelector('.xp-fill');
    expect(progressBar).toBeInTheDocument();
  });
});
