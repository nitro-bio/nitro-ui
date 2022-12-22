import { generateRandomAnnotations } from "@Ariadne/storyUtils";
import { getAnnotatedSequence } from "@Ariadne/utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";
import { useMemo, useState } from "react";

import { SequenceViewer } from ".";
import type { AA, AriadneSearch, AriadneSelection, Nucl } from "../types";

export default {
  title: "Ariadne/SequenceViewer",
  component: SequenceViewer,
  argTypes: {
    sequence: { type: "string" },
  },
} as ComponentMeta<typeof SequenceViewer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = ({
  sequence,
  initialSelection,
}: {
  sequence: string;
  initialSelection?: AriadneSelection;
}) => {
  const annotations = useMemo(
    () => generateRandomAnnotations(sequence, 5),
    [sequence]
  );

  const validatedSequence = sequence.replace(/[^ACGT]/g, "").split("") as
    | Nucl[]
    | AA[];

  const annotatedSequence = getAnnotatedSequence(
    validatedSequence,
    annotations,
    sequence
  );
  const [selection, setSelection] = useState<AriadneSelection | null>(
    initialSelection ?? null
  );

  const [searchStr, setSearch] = useState("");
  const [strandType, setStrandType] = useState("main");

  const search = {
    strand: strandType,
    searchBaseType: "DNA",
    searchString: searchStr,
  } as AriadneSearch;

  return (
    <Card className="h-[400px] max-w-xl">
      <div className="flex flex-col space-y-3">
        <input
          value={searchStr}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-row space-x-3">
          <label>Strand type: </label>
          <div>
            <input
              onChange={(e) => {
                setStrandType(e.target.value);
              }}
              checked={strandType === "main"}
              type="radio"
              value="main"
              name="default-radio"
              className="focus:ring-blue-500 h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2"
            />
            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Forward
            </label>
          </div>
          <div>
            <input
              onChange={(e) => {
                setStrandType(e.target.value);
              }}
              checked={strandType === "complement"}
              type="radio"
              value="complement"
              name="default-radio"
              className="focus:ring-blue-500 h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2"
            />
            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Reverse
            </label>
          </div>
          <div>
            <input
              onChange={(e) => {
                setStrandType(e.target.value);
              }}
              checked={strandType === "both"}
              type="radio"
              value="both"
              name="default-radio"
              className="focus:ring-blue-500 h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2"
            />
            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Both
            </label>
          </div>
        </div>
      </div>
      <SequenceViewer
        sequence={annotatedSequence}
        selection={selection}
        search={searchStr ? search : null}
        setSelection={setSelection}
      />
    </Card>
  );
};

export const SequenceViewerStory = Template.bind({});
SequenceViewerStory.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
};
export const SequenceViewerStoryForwardSelectionOverSeam = Template.bind({});
SequenceViewerStoryForwardSelectionOverSeam.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  initialSelection: {
    start: 10,
    end: 5,
    direction: "forward",
  },
};

export const SequenceViewerStoryReverseSelection = Template.bind({});
SequenceViewerStoryReverseSelection.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  initialSelection: {
    start: 10,
    end: 5,
    direction: "reverse",
  },
};

export const SequenceViewerStoryReverseSelectionOverSeam = Template.bind({});
SequenceViewerStoryReverseSelectionOverSeam.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  initialSelection: {
    start: 5,
    end: 10,
    direction: "reverse",
  },
};
