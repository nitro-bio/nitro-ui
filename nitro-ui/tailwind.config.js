/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
const brandColor = colors.indigo;

module.exports = {
  darkMode: "class",

  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
        brand: brandColor,
      },
    },
    ringColor: {
      brand: brandColor[500],
    },
    fontFamily: {
      sans: ["Inter var", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
