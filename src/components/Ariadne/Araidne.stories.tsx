import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";
import { useMemo, useState } from "react";

import { CircularViewer } from "./CircularViewer";
import { LinearViewer } from "./LinearViewer";
import { SequenceViewer } from "./SequenceViewer";
import { generateRandomAnnotations } from "./storyUtils";
import { AA, AriadneSearch, AriadneSelection, Nucl } from "./types";
import { getAnnotatedSequence } from "./utils";

export default {
  title: "Ariadne/Ariadne",
  argTypes: {
    sequence: { type: "string" },
  },
} as ComponentMeta<typeof CircularViewer>;

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

  const [strandType, setStrandType] = useState("");
  const [searchStr, setSearch] = useState("");

  const search = {
    strand: strandType,
    searchBaseType: "DNA",
    searchString: searchStr,
  } as AriadneSearch;

  return (
    <Card className="grid-row-auto grid grid-cols-1 content-center gap-4 bg-white dark:bg-noir-800 lg:h-screen lg:grid-cols-2 lg:grid-rows-2 ">
      <div className="flex flex-col space-y-3">
        <input
          className="dark:bg-gray-600 dark:text-brand-400"
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
              className="focus:ring-blue-500 h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 dark:bg-brand-600 dark:text-brand-400"
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
              className="focus:ring-blue-500 h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 dark:bg-brand-600 dark:text-brand-400"
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
              className="focus:ring-blue-500 h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 dark:bg-brand-600 dark:text-brand-400"
            />
            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Both
            </label>
          </div>
        </div>
      </div>
      <div className="row-span-2 grid shrink-0 content-center py-12">
        <SequenceViewer
          sequence={annotatedSequence}
          selection={selection}
          search={searchStr ? search : null}
          setSelection={setSelection}
        />
      </div>
      <div className="row-span-1 grid shrink-0 content-center ">
        <CircularViewer
          sequence={annotatedSequence}
          annotations={annotations}
          search={searchStr ? search : null}
          resetSearch={() => setSearch("")}
        />
      </div>
      <div className="row-span-1 grid shrink-0 content-center">
        <LinearViewer
          sequence={annotatedSequence}
          annotations={annotations}
          search={searchStr ? search : null}
          selection={selection}
          setSelection={setSelection}
        />
      </div>
    </Card>
  );
};

export const KitchenSinkViewerStory = Template.bind({});
KitchenSinkViewerStory.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
};
export const KitchenSinkViewerStoryForwardSelectionOverSeam = Template.bind({});
KitchenSinkViewerStoryForwardSelectionOverSeam.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  initialSelection: {
    start: 10,
    end: 5,
    direction: "forward",
  },
};

export const KitchenSinkViewerStoryReverseSelection = Template.bind({});
KitchenSinkViewerStoryReverseSelection.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  initialSelection: {
    start: 10,
    end: 5,
    direction: "reverse",
  },
};

export const KitchenSinkViewerStoryReverseSelectionOverSeam = Template.bind({});
KitchenSinkViewerStoryReverseSelectionOverSeam.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  initialSelection: {
    start: 5,
    end: 10,
    direction: "reverse",
  },
};
