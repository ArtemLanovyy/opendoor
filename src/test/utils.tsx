import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

// Add any providers here that your components need during testing
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Add providers here if needed, for example:
        <ThemeProvider theme="light">
          <SomeOtherProvider>
            {children}
          </SomeOtherProvider>
        </ThemeProvider>
      */}
      {children}
    </>
  );
};

// Custom render function that includes providers
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllProviders, ...options });

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render method
export { customRender as render };
