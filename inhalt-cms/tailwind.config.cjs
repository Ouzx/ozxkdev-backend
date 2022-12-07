/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Oswald", "serif"],
      "sans-serif": ["Source Serif Pro", "serif"],
    },
    extend: {},
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
