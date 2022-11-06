import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";
import { generateResults } from "../blastUtils";
import { TextAlignmentViz } from "./TextAlignmentViz";

export default {
  title: "Blast/TextAlignmentViz",
  component: TextAlignmentViz,
  argTypes: {
    query: { type: "string" },
  },
} as ComponentMeta<typeof TextAlignmentViz>;

const Template: ComponentStory<any> = (args: { query: string }) => {
  const results = generateResults({
    sequence: args.query,
  });

  const { query_range, query, midline, target, target_range } = results[0];
  return (
    <Card className="max-w-xl">
      <TextAlignmentViz
        query={query}
        query_range={query_range}
        midline={midline}
        target={target}
        target_range={target_range}
      />
    </Card>
  );
};

export const TextAlignmentVizStory = Template.bind({});
TextAlignmentVizStory.args = {
  query:
    "ATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATG",
};
