/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        gray: {
          50: '#f9fafb',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          700: '#374151',
          900: '#111827',
        },
        orange: {
          500: '#f97316',
        },
      },
    },
  },
  plugins: [],
};
