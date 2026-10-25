/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F9FA',
          100: '#D5F1F3',
          200: '#ADE4E8',
          300: '#75CFD7',
          400: '#3BB2BF',
          500: '#147D8E', // Primary Teal - trustworthy & calm
          600: '#0F6573',
          700: '#0E525E',
          800: '#11444E',
          900: '#123942',
          950: '#07242B',
        },
        accent: {
          50: '#FFF8F1',
          100: '#FEEDDB',
          200: '#FDD5B3',
          300: '#FAB682',
          400: '#F58B47',
          500: '#E8631C', // Warm Amber / Coral - human & motivating
          600: '#D44D12',
          700: '#B03810',
          800: '#8C2E15',
          900: '#722815',
        },
        surface: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          800: '#1E293B',
          900: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
