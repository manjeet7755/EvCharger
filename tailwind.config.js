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
        ev: {
          bg: '#061A15',
          surface: '#08211B',
          card: '#0D2921',
          'card-hover': '#13382D',
          border: '#214438',
          'border-light': '#2d5a4b',
          primary: '#20D995',
          'primary-hover': '#1ab87e',
          secondary: '#0DAB75',
          text: '#F5F7F6',
          muted: '#A5B8AF',
          dark: '#04100D',
        }
      },
      boxShadow: {
        'mint-glow': '0 0 25px -5px rgba(32, 217, 149, 0.25)',
        'mint-sm': '0 0 15px -3px rgba(32, 217, 149, 0.2)',
        'card-glow': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

