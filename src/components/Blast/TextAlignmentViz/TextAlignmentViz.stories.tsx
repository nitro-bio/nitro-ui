import { Card } from "@ui/Card";
import { generateResults } from "../blastUtils";
import { TextAlignmentViz } from "./TextAlignmentViz";

export default {
  title: "Blast/TextAlignmentViz",
  component: TextAlignmentViz,
  argTypes: {
    query: { type: "string" },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TextAlignmentVizStory = () => {
  const results = generateResults({
    sequence:
      "ATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATG",
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

TextAlignmentVizStory.args = {};
