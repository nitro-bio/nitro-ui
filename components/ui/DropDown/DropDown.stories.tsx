import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DropDown } from "./DropDown";

export default {
  title: "UI/Dropdown",
  component: DropDown,
} as ComponentMeta<typeof DropDown>;

const Template: ComponentStory<typeof DropDown> = (args) => (
  <div className="h-screen py-32 px-64 dark:bg-zinc-800">
    <DropDown {...args} />
  </div>
);

export const DropDownStory = Template.bind({});
DropDownStory.args = {
  intent: "primary",
};
