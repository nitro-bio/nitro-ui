import { baseInSelection } from "@Ariadne/utils";
import { classNames } from "@utils/stringUtils";
import { Fragment } from "react";

import type {
  AnnotatedAA,
  AnnotatedNucl,
  AnnotatedSequence,
  AriadneSelection,
  StackedAnnotation,
} from "../types";

export interface Props {
  sequences: AnnotatedSequence[];
  selection: AriadneSelection | null;
  containerClassName?: string;
  charClassName: ({
    base,
    sequenceIdx,
  }: {
    base: AnnotatedAA | AnnotatedNucl;
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
                baseInSelection(baseIdx, selection) && selectionClassName
              )}
              key={`base-${baseIdx}`}
            >
              {sequences.map((sequence, sequenceIdx) => {
                const base = sequence[itrIdx];
                return (
                  <div
                    key={`sequence-${sequenceIdx}-base-${baseIdx}`}
                    className="text-center"
                  >
                    <CharComponent
                      char={base.base}
                      index={baseIdx}
                      charClassName={charClassName({
                        base,
                        sequenceIdx,
                      })}
                    />
                    <SequenceAnnotation
                      annotations={base.annotations}
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
    <div className="relative " key={`annotation-${index}`}>
      {[...Array(maxAnnotationStack).keys()].map((i) => {
        const annotation = orderedAnnotations.find((a) => a.stack === i);
        if (annotation) {
          return (
            <div
              key={`annotation-${index}-${i}`}
              className={classNames("group h-1", annotation.className)}
              data-seq-index={index}
            >
              <div
                className={classNames(
                  "absolute top-4 z-10 hidden flex-col items-start rounded-md px-2 py-1 text-sm group-hover:flex",
                  annotation.className
                )}
              >
                <span>Pos: {index}</span>
                <span>{annotation.text}</span>
                <span>{annotation.type}</span>
              </div>
            </div>
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
    </div>
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
