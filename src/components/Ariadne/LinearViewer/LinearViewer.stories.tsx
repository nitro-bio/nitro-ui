import { generateRandomAnnotations } from "@Ariadne/storyUtils";
import {
  AriadneSelection,
  ValidatedSequence,
  AriadneSearch,
} from "@Ariadne/types";
import { getAnnotatedSequence } from "@Ariadne/utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";
import { useMemo, useState } from "react";

import { LinearViewer } from ".";

export default {
  title: "Ariadne/LinearViewer",
  component: LinearViewer,
  argTypes: {
    sequence: { type: "string" },
  },
} as ComponentMeta<typeof LinearViewer>;

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
  const validatedSequence = sequence
    .replace(/[^ACGT]/g, "")
    .split("") as ValidatedSequence;
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
    <Card className="max-w-xl">
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
      <LinearViewer
        sequence={annotatedSequence}
        annotations={annotations}
        search={searchStr ? search : null}
        selection={selection}
        setSelection={setSelection}
      />
    </Card>
  );
};

export const LinearViewerStory = Template.bind({});
LinearViewerStory.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
};
export const LinearViewerStoryForwardSelectionOverSeam = Template.bind({});
LinearViewerStoryForwardSelectionOverSeam.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  initialSelection: {
    start: 10,
    end: 5,
    direction: "forward",
  },
};

export const LinearViewerStoryReverseSelection = Template.bind({});
LinearViewerStoryReverseSelection.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  initialSelection: {
    start: 10,
    end: 5,
    direction: "reverse",
  },
};

export const LinearViewerStoryReverseSelectionOverSeam = Template.bind({});
LinearViewerStoryReverseSelectionOverSeam.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  initialSelection: {
    start: 5,
    end: 10,
    direction: "reverse",
  },
};
