import { ComponentMeta, ComponentStory } from "@storybook/react";
import { generateResults } from "../utils";
import { GlobalAlignmentViz } from "./GlobalAlignmentViz";

export default {
  title: "Blast/GlobalAlignmentViz",
  component: GlobalAlignmentViz,
  argTypes: {
    sequence: { type: "string" },
    sequenceName: { type: "string" },
  },
} as ComponentMeta<typeof GlobalAlignmentViz>;

const Template: ComponentStory<any> = (args: {
  sequence: string;
  sequenceName: string;
}) => {
  const length = args.sequence.length;
  const results = generateResults({ sequence: args.sequence });
  return (
    <GlobalAlignmentViz
      sequenceLength={length}
      sequenceName={args.sequenceName}
      results={results}
    />
  );
};

export const GlobalAlignmentVizStory = Template.bind({});
GlobalAlignmentVizStory.args = { sequence: "ATGCTG", sequenceName: "test" };
