const path = require("path");

module.exports = {
  stories: ["../components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-next",
    "storybook-tailwind-dark-mode",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  webpackFinal: async (config) => {
    config.resolve.alias["@ui"] = path.resolve(__dirname, "../components/ui");
    config.resolve.alias["@utils"] = path.resolve(__dirname, "../utils/");
    return config;
  },
};
