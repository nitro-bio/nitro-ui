import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Dropdown } from "./Dropdown";

export default {
  title: "UI/Dropdown",
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <div className="h-screen py-32 px-64 dark:bg-zinc-800">
    <Dropdown {...args} />
  </div>
);

export const DropdownStory = Template.bind({});
DropdownStory.args = {
  intent: "primary",
};
