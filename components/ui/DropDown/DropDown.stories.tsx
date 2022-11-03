import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DropDown } from "./DropDown";

export default {
  title: "UI/Dropdown",
  component: DropDown,
} as ComponentMeta<typeof DropDown>;

const Template: ComponentStory<typeof DropDown> = (args) => (
  <DropDown {...args} />
);

export const ToggleStory = Template.bind({});
ToggleStory.args = {
  items: "primary",
  menus: "primary",
};
