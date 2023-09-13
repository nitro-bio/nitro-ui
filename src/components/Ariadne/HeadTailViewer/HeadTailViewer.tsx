import { ABData, ABViewer } from "@Ariadne/ABViewer";
import { ReferenceTicks } from "@Ariadne/ReferenceTicks";
import { SequenceViewer } from "@Ariadne/SequenceViewer";
import {
  AnnotatedAA,
  AnnotatedNucl,
  AnnotatedSequence,
  AriadneSelection,
} from "@Ariadne/types";

interface HeadTailViewerProps {
  abData: ABData[];
  selection: AriadneSelection | null;
  sequences: AnnotatedSequence[];
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
  return (
    <div className="col-span-6 flex flex-col justify-center overflow-x-hidden py-4">
      <ReferenceTicks sequence={sequences[0]} />
      <ABViewer sequence={sequences[0]} data={abData} className="mt-1" />
      <SequenceViewer
        containerClassName="!flex-nowrap"
        sequences={sequences}
        selection={selection}
        selectionClassName="bg-sky-400/40"
        charClassName={charClassName ?? defaultClassName}
      />
    </div>
  );
};
