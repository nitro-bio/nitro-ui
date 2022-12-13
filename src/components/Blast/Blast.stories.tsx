import GlobalAlignmentViz from "@Blast/GlobalAlignmentViz";
import ResultCard from "@Blast/ResultCard";
import SequenceCard from "@Blast/SequenceCard";
import { ComponentStory } from "@storybook/react";
import { generateResults } from "./blastUtils";
export default {
  title: "Blast/Blast",
  argTypes: {
    sequence: { type: "string" },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = ({ sequence }: { sequence: string }) => {
  const results = generateResults({ sequence: sequence });
  const sequenceName = "Test Sequence";
  return (
    <div className="flex h-full w-full items-start justify-center px-4 pt-16 dark:bg-noir-600">
      <div className="grid-row-auto grid max-w-7xl grid-cols-1 content-center gap-4 lg:grid-cols-2">
        <div className="col-span-2 flex flex-1 items-center justify-center lg:col-span-1 ">
          <GlobalAlignmentViz
            sequenceName={sequenceName}
            sequenceLength={sequence.length}
            results={results}
          />
        </div>
        <div className="col-span-2 flex flex-1 items-center justify-center lg:col-span-1">
          <div className="max-w-2xl">
            <SequenceCard sequenceName={sequenceName} sequence={sequence} />
          </div>
        </div>
        <div className="col-span-2 grid flex-1 grid-cols-2 gap-4">
          {results.map((result) => (
            <div key={result.id} className="">
              <ResultCard result={result} sequenceType={"DNA"} />
            </div>
          ))}
        </div>
      </div>{" "}
    </div>
  );
};

export const KitchenSinkStory = Template.bind({});
KitchenSinkStory.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
};
