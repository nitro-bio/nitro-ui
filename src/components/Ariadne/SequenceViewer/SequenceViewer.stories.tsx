import { generateRandomAnnotations } from "@Ariadne/storyUtils";
import { getAnnotatedSequence, getStackedAnnotations } from "@Ariadne/utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";
import { useMemo, useState } from "react";

import { SequenceViewer } from ".";
import type {
  AA,
  AnnotatedAA,
  AnnotatedNucl,
  AriadneSelection,
  Nucl,
} from "../types";

export default {
  title: "Ariadne/SequenceViewer",
  component: SequenceViewer,
  argTypes: {
    sequence: { type: "string" },
  },
} as ComponentMeta<typeof SequenceViewer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = ({
  sequences,
  initialSelection,
  containerClassName,
  charClassName,
}: {
  sequences: string[];
  initialSelection?: AriadneSelection;
  containerClassName?: string;
  charClassName?: ({
    base,
    sequenceIdx,
  }: {
    base: AnnotatedAA | AnnotatedNucl;
    sequenceIdx: number;
  }) => string;
}) => {
  const annotationsPerSequence = useMemo(
    () => sequences.map((sequence) => generateRandomAnnotations(sequence, 5)),
    [sequences]
  );
  const stackedAnnotationsPerSequence = annotationsPerSequence.map(
    (annotations) => getStackedAnnotations(annotations)
  );

  const validatedSequences = sequences.map((sequence) =>
    sequence.replace(/[^ACGT]/g, "").split("")
  ) as Nucl[][] | AA[][];
  const zippedSequencesAndAnnotations = validatedSequences.map(
    (sequence, sequenceIdx) => {
      const annotations = stackedAnnotationsPerSequence[sequenceIdx];
      return [sequence, annotations] as const;
    }
  );
  const annotatedSequences = zippedSequencesAndAnnotations.map(
    ([sequence, annotations]) => getAnnotatedSequence(sequence, annotations)
  );
  const [selection] = useState<AriadneSelection | null>(
    initialSelection ?? null
  );

  const defaultCharClassName = () => {
    return "dark:text-brand-300 text-brand-600";
  };

  return (
    <div className="grid h-screen content-center">
      <Card className="h-[400px] max-w-xl overflow-y-scroll">
        <SequenceViewer
          selectionClassName="bg-brand-400/20"
          sequences={annotatedSequences}
          selection={selection}
          charClassName={charClassName ?? defaultCharClassName}
          containerClassName={containerClassName}
        />
      </Card>
    </div>
  );
};

export const SequenceViewerStory = Template.bind({});
SequenceViewerStory.args = {
  sequences: ["A", "T", "C", "G"].map((x) => x.repeat(400)),
};
export const SequenceViewerStoryForwardSelectionOverSeam = Template.bind({});
SequenceViewerStoryForwardSelectionOverSeam.args = {
  sequences: ["A", "T", "C", "G"].map((x) => x.repeat(400)),
  initialSelection: {
    start: 10,
    end: 5,
    direction: "forward",
  },
};

export const SequenceViewerStoryReverseSelection = Template.bind({});
SequenceViewerStoryReverseSelection.args = {
  sequences: ["A", "T", "C", "G"].map((x) => x.repeat(400)),
  initialSelection: {
    start: 10,
    end: 5,
    direction: "reverse",
  },
};

export const SequenceViewerStoryReverseSelectionOverSeam = Template.bind({});
SequenceViewerStoryReverseSelectionOverSeam.args = {
  sequences: ["A", "T", "C", "G"].map((x) => x.repeat(400)),
  initialSelection: {
    start: 5,
    end: 10,
    direction: "reverse",
  },
};

export const SequenceViewerStoryCustomClassNames = Template.bind({});
SequenceViewerStoryCustomClassNames.args = {
  sequences: ["A", "T", "C", "G"].map((x) => x.repeat(400)),
  containerClassName: "text-xl bg-noir-800 skew-y-3",
};

export const SequenceViewerStorySecondSequence = Template.bind({});
SequenceViewerStorySecondSequence.args = {
  sequences: ["A", "T", "C", "G"].map((x) => x.repeat(400)),

  initialSelection: {
    start: 5,
    end: 10,
    direction: "reverse",
  },
};
