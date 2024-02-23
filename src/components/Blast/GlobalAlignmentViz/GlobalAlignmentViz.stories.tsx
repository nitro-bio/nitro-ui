import { generateResults } from "../blastUtils";
import { GlobalAlignmentViz } from "./GlobalAlignmentViz";

export default {
  title: "Blast/GlobalAlignmentViz",
  component: GlobalAlignmentViz,
  argTypes: {
    sequence: { type: "string" },
    sequenceName: { type: "string" },
  },
};

export const GlobalAlignmentVizStory = () => {
  const sequence = "ATGCTG";
  const sequenceName = "test";
  const length = sequence.length;
  const results = generateResults({ sequence: sequence });
  return (
    <div className="max-w-xl">
      <GlobalAlignmentViz
        sequenceLength={length}
        sequenceName={sequenceName}
        results={results}
      />
    </div>
  );
};
