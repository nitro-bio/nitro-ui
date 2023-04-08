/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

const brandColor = colors.fuchsia;
const noirColor = colors.zinc;

module.exports = {
  darkMode: "class",

  content: ["./src/components/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    /* For user-defined ariadne colors */
    {
      pattern: /bg-.+/,
    },
    {
      pattern: /text-.+/,
    },
    "bg-teal-300",
  ],
  theme: {
    extend: {
      colors: {
        noir: noirColor,
        brand: brandColor,
      },
    },
    ringColor: {
      brand: brandColor[500],
      noir: colors.zinc[500],
    },
    fontFamily: {
      sans: ["Inter var", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {
    logs: false,
    theme: false,
  },
};
