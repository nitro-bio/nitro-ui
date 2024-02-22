import { Card } from "@ui/Card";
import { useMemo, useState } from "react";

import { CircularViewer } from "./CircularViewer";
import { LinearViewer } from "./LinearViewer";
import { SequenceViewer } from "./SequenceViewer";
import { generateRandomSequences } from "./storyUtils";
import { AriadneSelection } from "./types";
import { classNames } from "../..";

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
  const { sequences, annotations } = useMemo(
    () =>
      generateRandomSequences({
        maxSequences: 4,
        maxLength: 300,
        annotationOnClick: setSelection,
      }),
    [],
  );

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
    <Card className="grid grid-cols-1 gap-4 bg-white dark:bg-noir-800 lg:h-screen lg:grid-cols-2">
      <div className="h-full  overflow-y-scroll border-b border-zinc-600 lg:border-r lg:pr-8">
        <SequenceViewer
          sequences={sequences}
          selection={selection}
          charClassName={({ sequenceIdx }) =>
            classNameBySequenceIdx(sequenceIdx)
          }
          selectionClassName="bg-brand-400/20"
          annotations={annotations}
        />
      </div>
      <div className="grid w-full grid-cols-2 content-start gap-2 overflow-y-scroll">
        {sequences.map((sequence, idx) => (
          <CircularViewer
            key={idx}
            containerClassName={classNames(classNameBySequenceIdx(idx))}
            sequence={sequence}
            annotations={annotations}
            selection={selection}
            setSelection={setSelection}
            svgSizePX={250}
            svgPadding={20}
          />
        ))}
        <LinearViewer
          containerClassName="col-span-2"
          sequences={sequences}
          selection={selection}
          annotations={annotations}
          setSelection={setSelection}
          sequenceClassName={classNameBySequenceIdx}
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
