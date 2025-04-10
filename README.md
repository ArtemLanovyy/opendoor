# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Testing with Vitest

This project uses [Vitest](https://vitest.dev/) for unit and component testing. Vitest is a Vite-native testing framework that's fast and compatible with Jest.

### Available Test Commands

```bash
# Run tests once
npm test

# Run tests in watch mode (recommended during development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Files Structure

- Test files are located next to the files they test with a `.test.tsx` or `.test.ts` extension
- Test utilities are in the `src/test` directory
- The test setup is configured in `src/test/setup.ts`
