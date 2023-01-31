import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Histogram } from "./Histogram";

export default {
  title: "Plots/Histogram",
  component: Histogram,
  argTypes: {
    fullWidth: { type: "boolean" },
  },
} as ComponentMeta<typeof Histogram>;

const Template: ComponentStory<typeof Histogram> = (args) => (
  <Histogram {...args} />
);

export const HistogramStory = Template.bind({});
HistogramStory.args = {
  intent: "primary",
  children: "Histogram",
  onClick: () => {
    alert("Histogram clicked");
  },
};
