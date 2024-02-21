import { Card } from "@ui/Card";
import { useMemo, useState } from "react";

import { CircularViewer } from "./CircularViewer";
import { LinearAnnotationGutter, LinearViewer } from "./LinearViewer";
import { SequenceViewer } from "./SequenceViewer";
import { generateRandomSequences } from "./storyUtils";
import { AriadneSelection } from "./types";

export default {
  title: "Ariadne/Ariadne",
};

const AriadneStory = ({
  initialSelection,
}: {
  initialSelection?: AriadneSelection;
}) => {
  const [selection, setSelection] = useState<AriadneSelection | null>(
    initialSelection ?? null,
  );
  const {
    annotatedSequences: rootSequences,
    stackedAnnotations: rootStackedAnnotations,
  } = useMemo(
    () =>
      generateRandomSequences({
        maxLength: 1000,
        maxSequences: 1,
        annotationOnClick: setSelection,
      }),
    [],
  );
  const {
    annotatedSequences: secondarySequences,
    stackedAnnotations: secondaryStackedAnnotations,
  } = useMemo(
    () =>
      generateRandomSequences({
        maxLength: 200,
        maxSequences: 1,
        annotationOnClick: setSelection,
      }),
    [],
  );

  const rootSequence = rootSequences[0];
  const secondarySequence = secondarySequences[0];
  const classNameBySequenceIdx = (sequenceIdx: number) => {
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
    <Card className="grid-row-auto grid grid-cols-1 content-center gap-4 bg-white dark:bg-noir-800 lg:h-screen lg:grid-cols-2 lg:grid-rows-2 ">
      <div className="row-span-2 grid h-full max-w-xl shrink-0 content-start overflow-y-scroll border-r border-zinc-600 pr-8">
        <SequenceViewer
          sequences={[rootSequence, secondarySequence]}
          selection={selection}
          charClassName={({ sequenceIdx }) =>
            classNameBySequenceIdx(sequenceIdx)
          }
          selectionClassName="bg-brand-400/20"
        />
      </div>
      <div className="row-span-1 grid grid-cols-2 gap-1">
        <CircularViewer
          containerClassName="text-brand-400 "
          sequence={rootSequence}
          stackedAnnotations={rootStackedAnnotations}
          selection={selection}
          setSelection={setSelection}
        />
        <CircularViewer
          containerClassName="text-sky-400"
          sequence={secondarySequence}
          stackedAnnotations={secondaryStackedAnnotations}
          selection={selection}
          setSelection={setSelection}
        />

        <LinearViewer
          containerClassName="text-brand-400 h-32 col-span-2"
          sequences={[rootSequence, secondarySequence]}
          annotations={rootStackedAnnotations}
          selection={selection}
          setSelection={setSelection}
          selectionClassName={() => "text-brand-400"}
          sequenceClassName={classNameBySequenceIdx}
        />
        <LinearAnnotationGutter
          containerClassName="col-span-2"
          stackedAnnotations={rootStackedAnnotations}
          sequence={rootSequence}
        />
      </div>
    </Card>
  );
};

export const KitchenSinkViewerStory = () => <AriadneStory />;
export const KitchenSinkViewerStoryForwardSelectionOverSeam = () => (
  <AriadneStory
    initialSelection={{
      start: 10,
      end: 5,
      direction: "forward",
    }}
  />
);

export const KitchenSinkViewerStoryReverseSelection = () => (
  <AriadneStory
    initialSelection={{
      start: 10,
      end: 5,
      direction: "reverse",
    }}
  />
);

export const KitchenSinkViewerStoryReverseSelectionOverSeam = () => (
  <AriadneStory
    initialSelection={{
      start: 5,
      end: 10,
      direction: "reverse",
    }}
  />
);
