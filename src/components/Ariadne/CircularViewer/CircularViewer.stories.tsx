import { generateRandomSequences } from "@Ariadne/storyUtils";
import { AriadneSelection } from "@Ariadne/types";
import { Card } from "@ui/Card";
import { useMemo, useState } from "react";

import { CircularViewer } from ".";

export default {
  title: "Ariadne/CircularViewer",
  component: CircularViewer,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CircularStory = ({
  maxLength,
  initialSelection,
}: {
  maxLength?: number;
  initialSelection?: AriadneSelection;
}) => {
  const [selection, setSelection] = useState<AriadneSelection | null>(
    initialSelection ?? null
  );
  const { annotatedSequences, stackedAnnotations } = useMemo(
    () =>
      generateRandomSequences({
        maxSequences: 1,
        maxLength: maxLength ?? 1000,
      }),
    []
  );

  return (
    <div className="grid h-screen content-center">
      <Card className="max-w-xl">
        <CircularViewer
          containerClassName="text-brand-400"
          sequence={annotatedSequences[0]}
          stackedAnnotations={stackedAnnotations}
          selection={selection}
          setSelection={setSelection}
        />
      </Card>
    </div>
  );
};

export const MiniCircularViewerStory = () => <CircularStory maxLength={10} />;
export const CircularViewerStory = () => <CircularStory />;
export const CircularViewerStoryForwardSelectionOverSeam = () => (
  <CircularStory
    initialSelection={{
      start: 10,
      end: 5,
      direction: "forward",
    }}
  />
);

export const CircularViewerStoryReverseSelection = () => (
  <CircularStory
    initialSelection={{
      start: 1,
      end: 25,
      direction: "reverse",
    }}
  />
);

export const CircularViewerStoryReverseSelectionOverSeam = () => (
  <CircularStory
    initialSelection={{
      start: 5,
      end: 10,
      direction: "reverse",
    }}
  />
);
