import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DropDown } from "./DropDown";

export default {
  title: "UI/Dropdown",
  component: DropDown,
} as ComponentMeta<typeof DropDown>;

const Template: ComponentStory<typeof DropDown> = (args) => (
  <div className="fixed top-16 w-56 text-right">
    <DropDown {...args} />
  </div>
);

export const DropDownStory = Template.bind({});
DropDownStory.args = {
  items: "primary",
};
