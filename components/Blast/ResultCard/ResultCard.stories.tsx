import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ResultCard } from "./ResultCard";

export default {
  title: "Blast/ResultCard",
  component: ResultCard,
  argTypes: {
    sequence: { type: "string" },
    sequenceName: { type: "string" },
  },
} as ComponentMeta<typeof ResultCard>;

const Template: ComponentStory<any> = (args: {
  sequence: string;
  sequenceName: string;
}) => {
  return (
    <div className="max-w-xl">
      <ResultCard />
    </div>
  );
};

export const ResultCardStory = Template.bind({});
ResultCardStory.args = { sequence: "ATGCTG", sequenceName: "test" };
