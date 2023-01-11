import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";
import { generateBlastResults } from "../blastUtils";
import { TextAlignmentViz } from "./TextAlignmentViz";

export default {
  title: "Blast/TextAlignmentViz",
  component: TextAlignmentViz,
  argTypes: {
    query: { type: "string" },
  },
} as ComponentMeta<typeof TextAlignmentViz>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = (args: { query: string }) => {
  const results = generateBlastResults({
    sequence: args.query,
  });

  const { queryRange, query, midline, target, targetRange } = results[0];
  return (
    <Card className="max-w-xl">
      <TextAlignmentViz
        query={query}
        queryRange={queryRange}
        midline={midline}
        target={target}
        targetRange={targetRange}
      />
    </Card>
  );
};

export const TextAlignmentVizStory = Template.bind({});
TextAlignmentVizStory.args = {
  query:
    "ATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATG",
};
