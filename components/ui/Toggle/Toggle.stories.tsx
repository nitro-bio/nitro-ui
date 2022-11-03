import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Toggle } from "./Toggle";

export default {
  title: "UI/Toggle",
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />;

export const ToggleStory = Template.bind({});
ToggleStory.args = {
  intent: "lightEnabled",
};
