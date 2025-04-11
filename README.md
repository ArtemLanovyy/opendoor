# OpenDoor Project

A modern React application built with TypeScript, Vite, and TailwindCSS.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm (comes with Node.js)
- Git

## Getting Started

### Install Dependencies

```bash
npm install
```

### Running the Application

To start the development server:

```bash
npm run dev
```

This will launch the application in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Other Available Commands

```bash
# Build the application for production
npm run build

# Preview the production build
npm run preview

# Lint the codebase
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format

# Check code formatting
npm run format:check
```

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

## Project Structure

```
opendoor/
├── src/
│   ├── components/     # React components
│   ├── test/          # Test utilities and setup
│   └── ...
├── public/            # Static assets
└── ...
```

## Technologies Used

- React 19
- TypeScript
- Vite 6
- TailwindCSS 4
- Vitest (Testing)
- ESLint & Prettier (Code quality)
