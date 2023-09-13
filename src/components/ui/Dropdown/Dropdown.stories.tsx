import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Dropdown } from "./Dropdown";

export default {
  title: "UIElements/Dropdown",
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <div className="h-screen bg-white px-64 py-32 dark:bg-noir-800">
    <Dropdown {...args} />
  </div>
);

export const DropdownStory = Template.bind({});
DropdownStory.args = {
  intent: "primary",
};
