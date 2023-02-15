import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Histogram } from "./Histogram";
import { generateRandomHistogramData } from "./utils";

export default {
  title: "Plots/Histogram",
  component: Histogram,
  argTypes: {},
} as ComponentMeta<typeof Histogram>;

const Template: ComponentStory<typeof Histogram> = (args) => {
  return <Histogram {...args} />;
};

export const HistogramStory = Template.bind({});
HistogramStory.args = {
  data: generateRandomHistogramData(1000),
  initialBins: 50,
  colClassName: () =>
    "opacity-30 hover:opacity-100 transition-opacity duration-50 ease-in-out bg-brand-500",
  containerClassName: "h-[200px]",
};

export const HistogramWithWeightsStory = Template.bind({});
HistogramWithWeightsStory.args = {
  data: Array.from({ length: 1000 }, (_, i) => ({
    x: i,
    y: 0,
  })),
  initialBins: 8,
  maxBins: 1000,
  weightFunc: (d) => d.x,
  colClassName: () =>
    "opacity-30 hover:opacity-100 transition-opacity duration-50 ease-in-out bg-brand-500",
  containerClassName: "h-[200px]",
};
