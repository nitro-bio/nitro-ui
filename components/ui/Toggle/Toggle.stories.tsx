import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import { Toggle } from "./Toggle";

export default {
  title: "UI/Toggle",
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = () => {
  const [active, setActive] = useState(false);
  return <Toggle active={active} onClick={() => setActive(!active)} />;
};

export const ToggleStory = Template.bind({});
