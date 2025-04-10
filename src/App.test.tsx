import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders hello world heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/hello world/i);
    expect(headingElement).toBeInTheDocument();
  });

  it('has the correct CSS classes applied', () => {
    render(<App />);
    const headingElement = screen.getByText(/hello world/i);
    expect(headingElement).toHaveClass('text-3xl');
    expect(headingElement).toHaveClass('font-bold');
    expect(headingElement).toHaveClass('underline');
  });
});
