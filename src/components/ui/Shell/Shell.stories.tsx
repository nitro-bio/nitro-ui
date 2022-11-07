import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Shell } from "./Shell";

export default {
  title: "UI/Shell",
  component: Shell,
} as ComponentMeta<typeof Shell>;

const Template: ComponentStory<typeof Shell> = (args) => {
  return <Shell {...args} />;
};

export const ShellStory = Template.bind({});
ShellStory.args = {
  intent: "primary",
};
