const path = require("path");

module.exports = {
  stories: ["../src/components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  // addons: [
  //   "@storybook/addon-links",
  //   "@storybook/addon-essentials",
  //   "storybook-addon-next",
  //   "storybook-tailwind-dark-mode",
  // ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  viteFinal: async (config) => {
    console.log("HELLO", __dirname);
    return {
      ...config,
      define: {
        ...config.define,
        global: "window",
      },
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
            find: "@blast",
            replacement: path.resolve(__dirname, "../src/components/Blast"),
          },
        ],
      },
    };
  },
};
