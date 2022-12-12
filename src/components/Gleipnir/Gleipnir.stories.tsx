import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Gleipnir } from ".";
import { GENES, PROTEINS, REACTIONS } from "./storyUtils";

export default {
  title: "Gleipnir/Gleipnir",
  argTypes: {},
} as ComponentMeta<typeof Gleipnir>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = () => {
  return (
    <div className="flex items-center justify-center px-8 py-6 dark:bg-noir-700 ">
      <div className="max-w-7xl flex-1">
        <Gleipnir genes={GENES} proteins={PROTEINS} reactions={REACTIONS} />
      </div>
    </div>
  );
};

export const DefaultStory = Template.bind({});
