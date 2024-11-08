import "../src/index.css";
import type { Preview } from "@storybook/react";
import { withPerformance } from "storybook-addon-performance";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      showPanel: false,
    },
  },
  globalTypes: {
    darkMode: {
      defaultValue: true, // Enable dark mode by default on all stories
    },
  },
};

export const decorators = [withPerformance];

export default preview;
