import { ComponentMeta, ComponentStory } from "@storybook/react";

import RangeSlider from "./RangeSlider";

export default {
  title: "UIElements/RangeSlider",
  component: RangeSlider,
  argTypes: {
    fullWidth: { type: "boolean" },
  },
} as ComponentMeta<typeof RangeSlider>;

const Template: ComponentStory<typeof RangeSlider> = (args) => (
  <RangeSlider {...args} />
);

export const RangeSliderStory = Template.bind({});
RangeSliderStory.args = {
  thumbClassName: "bg-emerald-500 w-4 h-4 hover:h-6 hover:w-6 rounded-full",
  rangeClassName: "bg-emerald-700 hover:animate-pulse",
};
