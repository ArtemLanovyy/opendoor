import '@testing-library/jest-dom';

// Add any global test setup here
// For example, you can mock global objects or set up test environment variables

// This will silence React 18 console warnings about act()
// Remove if you want to see these warnings
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    /Warning: ReactDOM.render is no longer supported in React 18/.test(args[0]) ||
    /Warning: The current testing environment is not configured to support act/.test(args[0]) ||
    /Warning: You seem to have overlapping act/.test(args[0])
  ) {
    return;
  }
  originalConsoleError(...args);
};
