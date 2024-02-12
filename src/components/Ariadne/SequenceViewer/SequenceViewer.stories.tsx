import { generateRandomAnnotations } from "@Ariadne/storyUtils";
import { getAnnotatedSequence, getStackedAnnotations } from "@Ariadne/utils";
import { Card } from "@ui/Card";
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
};

const SequenceStory = ({
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
    [sequences],
  );
  const stackedAnnotationsPerSequence = annotationsPerSequence.map(
    (annotations) => getStackedAnnotations(annotations),
  );

  const validatedSequences = sequences.map((sequence) =>
    sequence.replace(/[^ACGT]/g, "").split(""),
  ) as Nucl[][] | AA[][];
  const zippedSequencesAndAnnotations = validatedSequences.map(
    (sequence, sequenceIdx) => {
      const annotations = stackedAnnotationsPerSequence[sequenceIdx];
      return [sequence, annotations] as const;
    },
  );
  const annotatedSequences = zippedSequencesAndAnnotations.map(
    ([sequence, annotations]) => getAnnotatedSequence(sequence, annotations),
  );
  const [selection] = useState<AriadneSelection | null>(
    initialSelection ?? null,
  );

  const defaultCharClassName = ({ sequenceIdx }: { sequenceIdx: number }) => {
    if (sequenceIdx === 0) {
      return "dark:text-brand-300 text-brand-600";
    } else if (sequenceIdx === 1) {
      return "dark:text-indigo-300 text-indigo-600";
    } else if (sequenceIdx === 2) {
      return "dark:text-amber-300 text-amber-600";
    } else {
      return "dark:text-noir-300 text-noir-600";
    }
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

export const SequenceViewerStory = () => (
  <SequenceStory sequences={["A", "T", "C", "G"].map((x) => x.repeat(400))} />
);
export const SequenceViewerStoryForwardSelectionOverSeam = () => (
  <SequenceStory
    sequences={["A", "T", "C", "G"].map((x) => x.repeat(400))}
    initialSelection={{
      start: 10,
      end: 5,
      direction: "forward",
    }}
  />
);

export const SequenceViewerStoryReverseSelection = () => (
  <SequenceStory
    sequences={["A", "T", "C", "G"].map((x) => x.repeat(400))}
    initialSelection={{
      start: 10,
      end: 5,
      direction: "reverse",
    }}
  />
);

export const SequenceViewerStoryReverseSelectionOverSeam = () => (
  <SequenceStory
    sequences={["A", "T", "C", "G"].map((x) => x.repeat(400))}
    initialSelection={{
      start: 5,
      end: 10,
      direction: "reverse",
    }}
  />
);

export const SequenceViewerStoryCustomClassNames = () => (
  <SequenceStory
    sequences={["A", "T", "C", "G"].map((x) => x.repeat(400))}
    containerClassName="text-xl bg-noir-800 skew-y-3"
  />
);

export const SequenceViewerStorySecondSequence = () => (
  <SequenceStory
    sequences={["A", "T", "C", "G"].map((x) => x.repeat(400))}
    initialSelection={{
      start: 5,
      end: 10,
      direction: "reverse",
    }}
  />
);
