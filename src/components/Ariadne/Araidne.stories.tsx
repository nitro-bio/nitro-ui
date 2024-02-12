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
  const { annotatedSequences, stackedAnnotations } = useMemo(
    () => generateRandomSequences({ maxLength: 200, maxSequences: 2 }),
    [],
  );
  const rootSequence = annotatedSequences[0];
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
      <div className="row-span-2 grid h-full max-w-xl shrink-0 content-start overflow-y-scroll py-12">
        <SequenceViewer
          sequences={annotatedSequences}
          selection={selection}
          charClassName={({ sequenceIdx }) =>
            classNameBySequenceIdx(sequenceIdx)
          }
          selectionClassName="bg-brand-400/20"
        />
      </div>
      <div className="row-span-1 grid shrink-0 content-center ">
        <CircularViewer
          containerClassName="text-brand-400"
          sequence={rootSequence}
          stackedAnnotations={stackedAnnotations}
          selection={selection}
          setSelection={setSelection}
        />
      </div>
      <div className="row-span-1 grid shrink-0 content-center">
        <LinearViewer
          containerClassName="text-brand-400"
          sequences={annotatedSequences}
          annotations={stackedAnnotations}
          selection={selection}
          setSelection={setSelection}
          selectionClassName={() => "text-brand-400"}
          sequenceClassName={classNameBySequenceIdx}
        />

        <LinearAnnotationGutter
          stackedAnnotations={stackedAnnotations}
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
