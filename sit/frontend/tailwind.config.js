/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      colors: {
        ecomPrimary: "#ff7043",
        ecomAcsend: "#2e66f6",
        ecomBlack: "#263238",
        ecomGrey: "#78889b",
        DTableBg: "#2E2D35",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        xs: "425px",
        sm: "576px",

        md: "768px",

        lg: "992px",

        xl: "1200px",

        "2xl": "1400px",
        "3xl": "1900px",
      },
    },
  },
  plugins: [],
};
