/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ambedkar: {
          950: '#061033',
          900: '#0B1F5C', // Deep primary
          800: '#142C75',
          700: '#1E3A8A', // Rich navy
          600: '#2563EB', // Vibrant blue
          500: '#3B82F6',
          400: '#60A5FA',
          100: '#DBEAFE',
          50: '#EFF6FF',
        },
        museum: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          darkBg: '#070D1F',
          darkCard: '#0C1738',
          border: '#E2E8F0',
          darkBorder: '#1E293B',
          gold: '#F59E0B',
          goldLight: '#FDE68A',
          goldDark: '#D97706',
        }
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        sans: ['Inter', '"Noto Sans Devanagari"', 'sans-serif'],
        devanagari: ['"Noto Sans Devanagari"', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
