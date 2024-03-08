import { generateRandomSequences } from "@Ariadne/storyUtils";
import { Card } from "@ui/Card";
import { useMemo, useState } from "react";

import { SequenceViewer } from ".";
import type { AnnotatedAA, AnnotatedNucl, AriadneSelection } from "../types";

export default {
  title: "Ariadne/SequenceViewer",
  component: SequenceViewer,
};

const SequenceStory = ({
  numSequences,
  initialSelection,
  containerClassName,
  charClassName,
}: {
  numSequences: number;
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
  const [selection] = useState<AriadneSelection | null>(
    initialSelection ?? null,
  );
  const { sequences, annotations } = useMemo(
    () =>
      generateRandomSequences({
        maxSequences: numSequences,
        maxLength: 100,
      }),
    [],
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
    <div className="grid h-screen content-center py-8">
      <Card className="max-w-4xl">
        <SequenceViewer
          selectionClassName="bg-brand-400/20"
          sequences={sequences}
          annotations={[
            {
              type: "insertion",
              start: 32,
              end: 79,
              direction: "reverse",
              className:
                "cursor-pointer text-white truncate opacity-50 group-hover:opacity-100 hover:opacity-100 bg-purple-600 fill-purple-600 stroke-purple-600 ",
              text: "insertion 1",
            },
            {
              type: "protein_bind",
              start: 92,
              end: 8,
              direction: "forward",
              className:
                "cursor-pointer text-white truncate opacity-50 group-hover:opacity-100 hover:opacity-100 bg-orange-600 fill-orange-600 stroke-orange-600 ",
              text: "protein_bind 0",
            },
            {
              type: "intron",
              start: 47,
              end: 19,
              direction: "forward",
              className:
                "cursor-pointer text-white truncate opacity-50 group-hover:opacity-100 hover:opacity-100 bg-purple-600 fill-purple-600 stroke-purple-600 ",
              text: "intron 2",
            },
          ]}
          selection={selection}
          charClassName={charClassName ?? defaultCharClassName}
          containerClassName={containerClassName}
        />
      </Card>
    </div>
  );
};

export const OneSequence = () => <SequenceStory numSequences={1} />;
export const TwoSequences = () => <SequenceStory numSequences={2} />;
export const EightSequences = () => <SequenceStory numSequences={8} />;
export const SequenceViewerStoryForwardSelectionOverSeam = () => (
  <SequenceStory
    numSequences={1}
    initialSelection={{
      start: 10,
      end: 5,
      direction: "forward",
    }}
  />
);

export const SequenceViewerStoryReverseSelection = () => (
  <SequenceStory
    numSequences={1}
    initialSelection={{
      start: 10,
      end: 5,
      direction: "reverse",
    }}
  />
);

export const SequenceViewerStoryReverseSelectionOverSeam = () => (
  <SequenceStory
    numSequences={1}
    initialSelection={{
      start: 5,
      end: 10,
      direction: "reverse",
    }}
  />
);

export const SequenceViewerStoryCustomClassNames = () => (
  <SequenceStory
    numSequences={1}
    containerClassName="text-xl bg-noir-800 skew-y-3"
  />
);

export const SequenceViewerStorySecondSequence = () => (
  <SequenceStory
    numSequences={1}
    initialSelection={{
      start: 5,
      end: 10,
      direction: "reverse",
    }}
  />
);
