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
        'home-bar': '#004e5b',
        'but-sky-blue': '#40c2c3',
        'cat-bg' : '#d9f2f2'
      },
    },
  },
  plugins: [],
});
