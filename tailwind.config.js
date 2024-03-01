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
        6: "repeat(6, minmax(0, 1fr))",
        24: "repeat(24, minmax(0, 1fr))",
        48: "repeat(48, minmax(0, 1fr))",
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
