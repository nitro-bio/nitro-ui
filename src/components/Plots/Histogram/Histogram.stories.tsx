import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Histogram } from "./Histogram";
import { generateRandomHistogramData } from "./utils";

export default {
  title: "Plots/Histogram",
  component: Histogram,
  argTypes: {},
} as ComponentMeta<typeof Histogram>;

const Template: ComponentStory<typeof Histogram> = () => {
  const data = generateRandomHistogramData(10000);
  return <Histogram data={data} initialBins={50} />;
};

export const HistogramStory = Template.bind({});
HistogramStory.args = {
  data: [
    { x: 1, y: 1 },
    { x: 2, y: 2 },
  ],
  initialBins: 8,
};
