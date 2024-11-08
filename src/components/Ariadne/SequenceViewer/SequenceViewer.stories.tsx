import { generateRandomAlignedSequences } from "@Ariadne/storyUtils";
import { Card } from "@ui/Card";
import { useMemo, useState } from "react";

import { SequenceViewer } from ".";
import type { AnnotatedBase, AriadneSelection } from "../types";

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
    base: AnnotatedBase;
    sequenceIdx: number;
  }) => string;
}) => {
  const [selection] = useState<AriadneSelection | null>(
    initialSelection ?? null,
  );
  const { sequences, annotations } = useMemo(
    () =>
      generateRandomAlignedSequences({
        maxSequences: numSequences,
        maxLength: 1000,
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
    <div className="grid min-h-screen content-center py-8">
      <Card className="max-w-4xl">
        <SequenceViewer
          selectionClassName="bg-brand-400/20"
          sequences={sequences}
          annotations={annotations}
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

export const SequenceViewerInvalid = () => {
  const charClassName = ({ sequenceIdx }: { sequenceIdx: number }) => {
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
          sequences={["FAIL SEQUENCE"]}
          annotations={[]}
          selection={null}
          charClassName={charClassName}
          noValidate
        />
      </Card>
    </div>
  );
};
