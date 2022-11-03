import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DropDown } from "./DropDown";

export default {
  title: "UI/Dropdown",
  component: DropDown,
} as ComponentMeta<typeof DropDown>;

const Template: ComponentStory<typeof DropDown> = (args) => (
  <DropDown {...args} />
);

export const DropDownStory = Template.bind({});
DropDownStory.args = {
  items: "primary",
};
