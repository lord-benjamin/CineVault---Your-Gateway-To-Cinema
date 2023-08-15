/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black1": "#101820",
        "black2": "#08111d",
        "black3": "#020f21",
        "black-light": "#17336e",
        "black-lighter": "#18397a",
        "orange": "#F65058",
        "yellow": "#FEC20C",
      },
      fontFamily: {
        bebas: ["Bebas Neue", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"]
      },
      animation: {
        'comeDown': 'comeDown 0.3s ease forwards',
      },
      keyframes: {
        comeDown: {
          '0%': {transform: 'translateY(-100%)'},
          '100%': {transform: 'translateY(0)'}
        }
      }
    },
  },
  plugins: [],
}

