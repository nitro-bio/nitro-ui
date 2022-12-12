import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Combobox } from "./Combobox";

export default {
  title: "UIElements/Combobox",
  component: Combobox,
} as ComponentMeta<typeof Combobox>;

const Template: ComponentStory<typeof Combobox> = (args) => {
  return (
    <div className="fixed top-16 w-72">
      <Combobox {...args} />
    </div>
  );
};

const people = [
  { id: "1", label: "Wade Cooper" },
  { id: "2", label: "Arlene Mccoy" },
  { id: "3", label: "Devon Webb" },
  { id: "4", label: "Tom Cook" },
  { id: "5", label: "Tanya Fox" },
  { id: "6", label: "Hellen Schmidt" },
];

export const ComboboxStory = Template.bind({});
ComboboxStory.args = {
  options: people,
};
