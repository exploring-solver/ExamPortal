const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'foot-blue': '#01354d',
        'home-bar': '#01354d',
        'but-sky-blue': '#01354d',
      },
    },
  },
  plugins: [],
});
