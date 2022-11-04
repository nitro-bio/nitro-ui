import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import { Toggle } from "./Toggle";

export default {
  title: "UI/Toggle",
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className="h-screen p-24 dark:bg-zinc-800">
      <Toggle checked={checked} onClick={() => setChecked(!checked)} />
    </div>
  );
};

export const ToggleStory = Template.bind({});
