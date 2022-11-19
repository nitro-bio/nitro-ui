const path = require("path");

module.exports = {
  stories: ["../src/components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-tailwind-dark-mode",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  viteFinal: async (config) => {
    return {
      ...config,
      resolve: {
        alias: [
          {
            find: "@ui",
            replacement: path.resolve(__dirname, "../src/components/ui"),
          },
          {
            find: "@utils",
            replacement: path.resolve(__dirname, "../src/utils"),
          },
          {
            find: "@Blast",
            replacement: path.resolve(__dirname, "../src/components/Blast"),
          },
          {
            find: "@Ariadne",
            replacement: path.resolve(__dirname, "../src/components/Ariadne"),
          },
        ],
      },
    };
  },
};
