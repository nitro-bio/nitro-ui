/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

const brandColor = colors.fuchsia;
const noirColor = colors.zinc;

module.exports = {
  darkMode: "class",

  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}"],
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
      gridTemplateColumns: {
        13: "repeat(13, minmax(0, 1fr))",
        25: "repeat(25, minmax(0, 1fr))",
        49: "repeat(49, minmax(0, 1fr))",
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },
    },
    ringColor: {
      brand: brandColor[500],
      noir: colors.zinc[500],
    },
    fontFamily: {
      sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
      serif: ["Merriweather", ...defaultTheme.fontFamily.serif],
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
