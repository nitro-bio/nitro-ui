import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import { Toggle } from "./Toggle";

export default {
  title: "UIElements/Toggle",
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="h-screen bg-white p-24 dark:bg-noir-800">
      <Toggle checked={checked} onClick={() => setChecked(!checked)} />
    </div>
  );
};

export const ToggleStory = Template.bind({});
