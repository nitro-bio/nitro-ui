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

const repeatArray = (arr: any[], n: number) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(...arr);
  }
  return result;
};

const people = repeatArray(
  [
    { label: "Wade Cooper" },
    { label: "Arlene Mccoy" },
    { label: "Devon Webb" },
    { label: "Tom Cook" },
    { label: "Tanya Fox" },
    { label: "Hellen Schmidt" },
  ],
  100
).map((p, i) => ({ ...p, id: i.toString() }));

export const ComboboxStory = Template.bind({});
ComboboxStory.args = {
  options: people,
};

export const OptionsContainerClassnameComboboxStory = Template.bind({});
OptionsContainerClassnameComboboxStory.args = {
  options: people,
  optionsContainerClassName: "mt-32 ml-32 !min-w-[600px]",
};
