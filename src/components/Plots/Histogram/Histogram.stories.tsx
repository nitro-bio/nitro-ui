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
  data: generateRandomHistogramData(10000),
  initialBins: 50,
};

export const HistogramWithWeightsStory = Template.bind({});
HistogramWithWeightsStory.args = {
  data: [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },
    { x: 4, y: 2 },
    { x: 5, y: 1 },
    { x: 6, y: 1 },
    { x: 7, y: 1 },
    { x: 8, y: 2 },
    { x: 9, y: 1 },
    { x: 10, y: 1 },
    { x: 11, y: 1 },
    { x: 12, y: 2 },
    { x: 13, y: 1 },
    { x: 14, y: 1 },
    { x: 15, y: 1 },
    { x: 16, y: 2 },
    { x: 17, y: 1 },
    { x: 18, y: 1 },
    { x: 19, y: 1 },
  ],
  initialBins: 8,
  weightFunc: (d) => d.x,
};
