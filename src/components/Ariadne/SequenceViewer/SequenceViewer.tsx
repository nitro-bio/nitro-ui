import { baseInSelection } from "@Ariadne/utils";
import { classNames } from "@utils/stringUtils";
import { Fragment } from "react";

import type {
  AnnotatedSequence,
  AriadneSelection,
  StackedAnnotation,
} from "../types";

export interface Props {
  sequences: AnnotatedSequence[];
  selection: AriadneSelection | null;
  containerClassName?: string;
  charClassName: ({
    char,
    sequenceIdx,
  }: {
    char: string;
    sequenceIdx: number;
  }) => string;
  selectionClassName?: string;
}
export const SequenceViewer = ({
  sequences,
  selection,
  containerClassName,
  charClassName,
  selectionClassName,
}: Props) => {
  // check if all sequences are the same length
  const sequenceLength = sequences[0].length;
  const allSequencesSameLength = sequences.every(
    (seq) => seq.length === sequenceLength
  );
  if (!allSequencesSameLength) {
    throw new Error("All sequences must be the same length");
  }
  const seqLength = sequences[0].length;

  return (
    <>
      <div
        className={classNames("font-mono flex flex-wrap ", containerClassName)}
      >
        {sequences[0].map(({ index: baseIdx }, itrIdx) => {
          return (
            <div
              className={classNames(
                "my-2 flex flex-col justify-start",
                baseInSelection(baseIdx, selection, seqLength) &&
                  selectionClassName
              )}
              key={`base-${baseIdx}`}
            >
              {sequences.map((sequence, sequenceIdx) => {
                const { base, annotations } = sequence[itrIdx];
                return (
                  <div
                    key={`sequence-${sequenceIdx}-base-${baseIdx}`}
                    className="text-center"
                  >
                    <CharComponent
                      char={base}
                      index={baseIdx}
                      charClassName={charClassName({
                        char: base,
                        sequenceIdx,
                      })}
                    />
                    <SequenceAnnotation
                      annotations={annotations}
                      maxAnnotationStack={5}
                      index={baseIdx}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
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
    <Fragment key={`annotation-${index}`}>
      {[...Array(maxAnnotationStack).keys()].map((i) => {
        const annotation = orderedAnnotations.find((a) => a.stack === i);
        if (annotation) {
          return (
            <div
              key={`annotation-${index}-${i}`}
              className={classNames("h-1", annotation.className)}
              data-seq-index={index}
            />
          );
        } else {
          return (
            <div
              key={`placeholder-${index}-${i}`}
              className={"h-1"}
              data-seq-index={index}
            />
          );
        }
      })}
    </Fragment>
  );
};

interface CharProps {
  char: string;
  index: number;
  charClassName: string;
}

const CharComponent = ({ index, char, charClassName }: CharProps) => (
  <div className={classNames(charClassName, "")}>{char}</div>
);
