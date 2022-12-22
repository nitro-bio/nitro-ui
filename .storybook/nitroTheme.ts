import { create } from "@storybook/theming";

export default create({
  base: "dark",
  colorPrimary: "#a21caf",
  colorSecondary: "#c026d3",

  // UI
  appBg: "#18181b",
  appContentBg: "#18181b",
  appBorderColor: "black",
  appBorderRadius: 2,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: "monospace",

  // Text colors
  textColor: "white",
  textInverseColor: "rgba(255,255,255,0.9)",

  // Toolbar default and active colors
  barBg: "black",
  barTextColor: "white",
  barSelectedColor: "#a21caf",

  brandTitle: "Nitro Bio",
  brandUrl: "https://nitro.bio",
  // brandImage: "https://www.nitro.bio/android-chrome-512x512.png",
  brandTarget: "_self",
});
