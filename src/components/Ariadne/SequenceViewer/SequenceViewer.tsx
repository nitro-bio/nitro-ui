import { baseInSelection } from "@Ariadne/utils";
import { classNames } from "@utils/stringUtils";

import type {
  AnnotatedAA,
  AnnotatedBase,
  AnnotatedNucl,
  AnnotatedSequence,
  AriadneSelection,
  StackedAnnotation,
} from "../types";

export const SequenceViewer = ({
  sequences,
  selection,
  containerClassName,
  charClassName,
  selectionClassName,
}: {
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
}) => {
  return (
    <>
      <div className={classNames(" flex flex-wrap ", containerClassName)}>
        {sequences[0].map(({ index: baseIdx }) => {
          return (
            <div
              className={classNames("my-2 flex flex-col justify-between")}
              key={`base-${baseIdx}`}
            >
              {sequences.map((sequence: AnnotatedBase[], sequenceIdx) => {
                const base = sequence.find(
                  (base: AnnotatedBase) => base.index === baseIdx
                ) || { base: " ", annotations: [], index: baseIdx };

                return (
                  <div
                    key={`sequence-${sequenceIdx}-base-${baseIdx}`}
                    className=" whitespace-pre text-center"
                  >
                    <CharComponent
                      char={base.base}
                      index={baseIdx}
                      charClassName={classNames(
                        charClassName({
                          base,
                          sequenceIdx,
                        }),
                        baseInSelection(baseIdx, selection) &&
                          base.base !== " " &&
                          selectionClassName
                      )}
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
          return <div key={`placeholder-${index}-${i}`} className={"h-1"} />;
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

const CharComponent = ({ char, charClassName }: CharProps) => (
  <div className={classNames(charClassName, "mr-px font-mono")}>{char}</div>
);
