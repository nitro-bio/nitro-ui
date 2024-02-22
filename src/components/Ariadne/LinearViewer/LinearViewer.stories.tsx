import { generateRandomSequences } from "@Ariadne/storyUtils";
import {
  Annotation,
  AriadneSelection,
  StackedAnnotation,
} from "@Ariadne/types";
import { Card } from "@ui/Card";
import { useMemo, useState } from "react";
import { LinearViewer } from ".";

export default {
  title: "Ariadne/LinearViewer",
  component: LinearViewer,
  argTypes: {
    sequences: { type: "string" },
  },
};

const LinearStory = ({
  initialSelection,
  selectionClassName,
}: {
  initialSelection?: AriadneSelection;
  selectionClassName?: (selection: AriadneSelection) => string;
  customStackFn?: (annotations: Annotation[]) => StackedAnnotation[];
}) => {
  const { sequences, annotations } = useMemo(
    () =>
      generateRandomSequences({
        maxSequences: 5,
        maxLength: 100,
      }),
    [],
  );
  const [selection, setSelection] = useState<AriadneSelection | null>(
    initialSelection ?? null,
  );
  const classNameBySequenceIdx = (sequenceIdx: number) => {
    if (sequenceIdx === 0) {
      return "dark:text-brand-300 text-brand-600";
    } else if (sequenceIdx === 1) {
      return "dark:text-indigo-300 text-indigo-600";
    } else if (sequenceIdx === 2) {
      return "dark:text-amber-300 text-amber-600";
    } else {
      return "dark:text-brand-300/50 text-brand-600/50";
    }
  };

  return (
    <Card className="w-full max-w-3xl px-8">
      <LinearViewer
        containerClassName="text-brand-400 "
        sequences={sequences}
        annotations={annotations}
        selection={selection}
        setSelection={setSelection}
        selectionClassName={selectionClassName}
        sequenceClassName={classNameBySequenceIdx}
      />
    </Card>
  );
};

export const LinearViewerStory = () => {
  return <LinearStory />;
};
export const LinearViewerStoryForwardSelectionOverSeam = () => {
  return (
    <LinearStory
      initialSelection={{
        start: 10,
        end: 5,
        direction: "forward",
      }}
    />
  );
};
export const LinearViewerStoryReverseSelection = () => {
  return (
    <LinearStory
      initialSelection={{
        start: 10,
        end: 5,
        direction: "reverse",
      }}
    />
  );
};
export const LinearViewerStoryReverseSelectionOverSeam = () => {
  return (
    <LinearStory
      initialSelection={{
        start: 5,
        end: 10,
        direction: "reverse",
      }}
    />
  );
};
export const LinearViewerStorySelectionClassName = () => {
  return (
    <LinearStory
      initialSelection={{
        start: 5,
        end: 10,
        direction: "reverse",
      }}
      selectionClassName={(selection: AriadneSelection) => {
        if (Math.abs(selection.end - selection.start) > 100) {
          return "bg-red-500 fill-red-500 text-red-500";
        } else {
          return "bg-blue-500 fill-blue-500 text-blue-500";
        }
      }}
    />
  );
};
