import { ComponentMeta, ComponentStory } from "@storybook/react";
import { generateBlastResults } from "../blastUtils";
import { GlobalAlignmentViz } from "./GlobalAlignmentViz";

export default {
  title: "Blast/GlobalAlignmentViz",
  component: GlobalAlignmentViz,
  argTypes: {
    sequence: { type: "string" },
    sequenceName: { type: "string" },
  },
} as ComponentMeta<typeof GlobalAlignmentViz>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = (args: {
  sequence: string;
  sequenceName: string;
}) => {
  const { length } = args.sequence;
  const results = generateBlastResults({ sequence: args.sequence });
  return (
    <div className="max-w-xl">
      <GlobalAlignmentViz
        sequenceLength={length}
        sequenceName={args.sequenceName}
        results={results}
      />
    </div>
  );
};

export const GlobalAlignmentVizStory = Template.bind({});
GlobalAlignmentVizStory.args = { sequence: "ATGCTG", sequenceName: "test" };
