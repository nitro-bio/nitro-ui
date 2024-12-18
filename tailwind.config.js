/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

const brandColor = colors.emerald;
const accentColor = colors.sky;
const noirColor = colors.zinc;

module.exports = {
  darkMode: "selector",
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
        accent: accentColor,
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
  plugins: [],
};
