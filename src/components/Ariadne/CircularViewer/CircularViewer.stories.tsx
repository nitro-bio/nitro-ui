import { generateRandomAnnotations } from "@Ariadne/storyUtils";
import {
  Annotation,
  AriadneSelection,
  ValidatedSequence,
} from "@Ariadne/types";
import { getAnnotatedSequence, getStackedAnnotations } from "@Ariadne/utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Card } from "@ui/Card";
import { useMemo, useState } from "react";

import { CircularViewer } from ".";

export default {
  title: "Ariadne/CircularViewer",
  component: CircularViewer,
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
  const [selection, setSelection] = useState<AriadneSelection | null>(
    initialSelection ?? null
  );

  const annotations = useMemo(
    () => generateRandomAnnotations(sequence, 5),
    [sequence]
  ).map((annotation) => ({
    ...annotation,
    onClick: (ann: Annotation) => {
      setSelection(ann);
    },
  }));

  const stackedAnnotations = getStackedAnnotations(annotations);
  const validatedSequence = sequence.split("") as ValidatedSequence;
  const annotatedSequence = getAnnotatedSequence(
    validatedSequence,
    stackedAnnotations
  );
  return (
    <div className="grid h-screen content-center">
      <Card className="max-w-xl">
        <CircularViewer
          containerClassName="text-brand-400"
          sequence={annotatedSequence}
          stackedAnnotations={stackedAnnotations}
          selection={selection}
          setSelection={setSelection}
        />
      </Card>
    </div>
  );
};

export const MiniCircularViewerStory = Template.bind({});
MiniCircularViewerStory.args = {
  sequence: "ATGCATGCATGCATGCATGC",
};
export const CircularViewerStory = Template.bind({});
CircularViewerStory.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
};
export const CircularViewerStoryForwardSelectionOverSeam = Template.bind({});
CircularViewerStoryForwardSelectionOverSeam.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  initialSelection: {
    start: 10,
    end: 5,
    direction: "forward",
  },
};

export const CircularViewerStoryReverseSelection = Template.bind({});
CircularViewerStoryReverseSelection.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  initialSelection: {
    start: 1,
    end: 25,
    direction: "reverse",
  },
};

export const CircularViewerStoryReverseSelectionOverSeam = Template.bind({});
CircularViewerStoryReverseSelectionOverSeam.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  initialSelection: {
    start: 5,
    end: 10,
    direction: "reverse",
  },
};
