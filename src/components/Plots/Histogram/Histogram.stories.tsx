import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Histogram } from "./Histogram";

export default {
  title: "Plots/Histogram",
  component: Histogram,
  argTypes: {},
} as ComponentMeta<typeof Histogram>;

const Template: ComponentStory<typeof Histogram> = () => {
  const data = generateRandomData(10000);
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

const generateRandomData = (n: number) => {
  const data = [];
  for (let i = 0; i < n; i++) {
    data.push({ x: Math.random(), y: Math.random() });
  }
  return data;
};
