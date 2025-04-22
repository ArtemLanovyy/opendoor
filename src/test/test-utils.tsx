import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';
import { ListingsProvider } from '../context/ListingsContext';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

afterEach(() => {
  cleanup();
});

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return <ListingsProvider>{children}</ListingsProvider>;
}

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };
export { AllTheProviders as TestWrapper };
