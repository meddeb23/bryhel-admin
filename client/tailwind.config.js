/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

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
