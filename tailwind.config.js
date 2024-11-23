/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: '#FFC01D',
        F49731: '#F49731',
        Am4: '#FCE079',
      }
    },
  },
  plugins: [],
}