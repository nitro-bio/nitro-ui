module.exports = {
  stories: ["../components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-next",
  ],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
};
