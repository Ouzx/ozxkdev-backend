/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Oswald", "serif"],
      "sans-serif": ["Source Serif Pro", "serif"],
    },
    colors: {
      ...colors,
      dblack: "#292929",
      dblackOver: "#313131",
      dblackOver2: "#353535",
    },
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/topography.svg')",
        "hero-pattern-dark": "url('/topography-dark.svg')",
      },
    },
  },
  plugins: [
    // <div class="child:text-gray-200 child-hover:text-blue-500">...</div>
    // Source: https://stackoverflow.com/questions/67119992/how-to-access-all-the-direct-children-of-a-div-in-tailwindcss
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
