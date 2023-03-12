import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Volcano } from "./Volcano";
import { generateRandomVolcanoData } from "./utils";

export default {
  title: "Plots/Volcano",
  component: Volcano,
  argTypes: {},
} as ComponentMeta<typeof Volcano>;

const Template: ComponentStory<typeof Volcano> = (args) => {
  return <Volcano {...args} />;
};

export const VolcanoStory = Template.bind({});
VolcanoStory.args = {
  data: generateRandomVolcanoData(100),
  pointClassName: () =>
    "opacity-30 hover:opacity-100 transition-opacity duration-300 ease-in-out bg-brand-500 h-2 w-2 rounded-full",
  containerClassName: "h-[200px]",
};
