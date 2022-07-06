/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#4c60f2",
        darkgray: "#1e2022",
        accentdarkgray: "#181a1b",
        transparent: "transparent",
        current: "currentColor",
      },
    },
  },
  plugins: [],
};
