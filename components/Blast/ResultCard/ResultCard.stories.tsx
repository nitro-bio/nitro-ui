import { ComponentMeta, ComponentStory } from "@storybook/react";
import { generateResults } from "../blastUtils";
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
  const results = generateResults({
    sequence: args.sequence,
  });

  return (
    <div className="max-w-xl">
      <ResultCard result={results[0]} sequenceType={"DNA"} />
    </div>
  );
};

export const ResultCardStory = Template.bind({});
ResultCardStory.args = { sequence: "ATGCTG", sequenceName: "test" };
