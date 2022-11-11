import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Button } from "./Button";

export default {
  title: "UIElements/Button",
  component: Button,
  argTypes: {
    fullWidth: { type: "boolean" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const ButtonStory = Template.bind({});
ButtonStory.args = {
  intent: "primary",
  children: "Button",
  onClick: () => {
    alert("Button clicked");
  },
};
