import { baseInSelection } from "@Ariadne/utils";
import { classNames } from "@utils/stringUtils";

import type {
  AnnotatedSequence,
  AriadneSelection,
  StackedAnnotation,
} from "../types";

export type CharType = "sequence" | "complement";

export interface Props {
  sequence: AnnotatedSequence;
  selection: AriadneSelection | null;
  containerClassName?: string;
  charClassName?: ({ char, type }: { char: string; type: CharType }) => string;
}
export const SequenceViewer = ({
  sequence,
  selection,
  containerClassName,
  charClassName,
}: Props) => {
  const internalCharClassName =
    charClassName ||
    (({ type }) => {
      if (type == "sequence") {
        return "dark:text-brand-300 text-brand-600";
      }
      if (type == "complement") {
        return "dark:text-brand-100 text-brand-400/80 select-none";
      } else {
        throw new Error(`Unknown char type ${type}`);
      }
    });
  return (
    <>
      <div
        className={classNames(
          "font-mono flex h-full flex-row flex-wrap overflow-y-scroll text-center",
          containerClassName
        )}
      >
        {sequence.map(({ base, complement, annotations, index }) => {
          return (
            <div key={`sequence-viewer-base-${index}`} data-seq-index={index}>
              <CharComponent
                type="sequence"
                char={base}
                index={index}
                charClassName={charClassName || internalCharClassName}
              />
              <SelectionMarker
                index={index}
                selection={selection}
                sequenceLength={sequence.length}
              />
              <CharComponent
                type="complement"
                char={complement}
                index={index}
                charClassName={charClassName || internalCharClassName}
              />
              <SequenceAnnotation
                annotations={annotations}
                maxAnnotationStack={5}
                index={index}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

const SelectionMarker = ({
  index,
  selection,
  sequenceLength,
}: {
  index: number;
  selection: AriadneSelection | null;
  sequenceLength: number;
}) => {
  return (
    <div
      key={`sequence-viewer-base-${index}`}
      className={classNames(
        "h-1",
        selection &&
          baseInSelection(index, selection, sequenceLength) &&
          "-mx-1 bg-brand-300"
      )}
    />
  );
};

const SequenceAnnotation = ({
  annotations,
  maxAnnotationStack,
  index,
}: {
  annotations: StackedAnnotation[];
  maxAnnotationStack: number;
  index: number;
}) => {
  const orderedAnnotations = annotations.sort((a, b) => a.stack - b.stack);
  return (
    <>
      {[...Array(maxAnnotationStack).keys()].map((i) => {
        const annotation = orderedAnnotations.find((a) => a.stack === i);
        if (annotation) {
          return (
            <div
              key={`${annotation.start}-${annotation.end}`}
              className={classNames("h-1", annotation.className)}
              data-seq-index={index}
            />
          );
        } else {
          return (
            <div
              key={`placeholder-${i}`}
              className={"h-1"}
              data-seq-index={index}
            />
          );
        }
      })}
    </>
  );
};

interface CharProps {
  char: string;
  index: number;
  type: CharType;
  charClassName: ({ char, type }: { char: string; type: CharType }) => string;
}

/* data-seq-index is used to get indices for selection */
const CharComponent = ({ index, char, type, charClassName }: CharProps) => (
  <div data-seq-index={index} className={charClassName({ char, type })}>
    {char}
  </div>
);
