import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";
import { useMemo, useState } from "react";

import { CircularViewer } from "./CircularViewer";
import { LinearAnnotationGutter, LinearViewer } from "./LinearViewer";
import { SequenceViewer } from "./SequenceViewer";
import { generateRandomAnnotations } from "./storyUtils";
import { AA, AriadneSelection, Nucl } from "./types";
import { getAnnotatedSequence, getStackedAnnotations } from "./utils";

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
  const stackedAnnotations = getStackedAnnotations(annotations);
  const annotatedSequence = getAnnotatedSequence(
    validatedSequence,
    stackedAnnotations
  );
  const [selection, setSelection] = useState<AriadneSelection | null>(
    initialSelection ?? null
  );
  return (
    <Card className="grid-row-auto grid grid-cols-1 content-center gap-4 bg-white dark:bg-noir-800 lg:h-screen lg:grid-cols-2 lg:grid-rows-2 ">
      <div className="row-span-2 grid shrink-0 content-center py-12">
        <SequenceViewer
          sequences={[annotatedSequence]}
          selection={selection}
          charClassName={() => "text-brand-500 dark:text-brand-400"}
          selectionClassName="bg-brand-400/20"
        />
      </div>
      <div className="row-span-1 grid shrink-0 content-center ">
        <CircularViewer
          sequence={annotatedSequence}
          annotations={annotations}
          selection={selection}
          setSelection={setSelection}
        />
      </div>
      <div className="row-span-1 grid shrink-0 content-center">
        <LinearViewer
          containerClassName="text-brand-400"
          sequence={annotatedSequence}
          annotations={stackedAnnotations}
          selection={selection}
          setSelection={setSelection}
          selectionClassName={() => "text-brand-400"}
          cursorClassName="text-brand-200"
        />

        <LinearAnnotationGutter
          containerClassName="-mt-8"
          stackedAnnotations={stackedAnnotations}
          sequence={annotatedSequence}
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
