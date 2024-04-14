import { ABData, ABViewer } from "@Ariadne/ABViewer";
import { ReferenceTicks } from "@Ariadne/ReferenceTicks";
import { SequenceViewer } from "@Ariadne/SequenceViewer";
import { AnnotatedAA, AnnotatedNucl, AriadneSelection } from "@Ariadne/types";
import { getAnnotatedSequence } from "@Ariadne/utils";
import { useMemo } from "react";

interface HeadTailViewerProps {
  abData: ABData[];
  selection: AriadneSelection | null;
  sequences: string[];
  alignmentOffset: number;
  className?: string;
  charClassName?: (args: {
    sequenceIdx: number;
    base: AnnotatedNucl | AnnotatedAA;
  }) => string;
}

export const HeadTailViewer = ({
  abData,
  sequences,
  selection,
  charClassName,
}: HeadTailViewerProps) => {
  const defaultClassName = () => {
    return "text-brand-600 dark:text-brand-300";
  };
  const annotatedSequences = useMemo(
    function memoize() {
      return sequences.map((sequence) =>
        getAnnotatedSequence({ sequence, stackedAnnotations: [] }),
      );
    },
    [sequences],
  );

  return (
    <div className="col-span-6 flex flex-col justify-center overflow-x-hidden py-4">
      <ReferenceTicks sequence={annotatedSequences[0]} />
      <ABViewer
        sequence={annotatedSequences[0]}
        data={abData}
        className="mt-1"
      />
      <SequenceViewer
        containerClassName="!flex-nowrap"
        sequences={sequences}
        selection={selection}
        selectionClassName="bg-sky-400/40"
        charClassName={charClassName ?? defaultClassName}
        annotations={[]}
      />
    </div>
  );
};
