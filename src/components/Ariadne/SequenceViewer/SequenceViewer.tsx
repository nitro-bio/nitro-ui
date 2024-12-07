import {
  baseInSelection,
  getAnnotatedSequence,
  stackAnnotationsNoOverlap,
} from "@Ariadne/utils";
import { classNames } from "@utils/stringUtils";

import { useMemo, useState } from "react";
import type {
  AnnotatedBase,
  Annotation,
  AriadneSelection,
  StackedAnnotation,
} from "../types";

export const SequenceViewer = ({
  sequences,
  annotations,
  selection,
  containerClassName,
  charClassName,
  selectionClassName,
  noValidate,
}: {
  sequences: string[];
  annotations: Annotation[];
  selection: AriadneSelection | null;
  containerClassName?: string;
  charClassName: ({
    base,
    sequenceIdx,
  }: {
    base: AnnotatedBase;
    sequenceIdx: number;
  }) => string;
  selectionClassName?: string;
  noValidate?: boolean;
}) => {
  const [hoveredPosition, setHoveredPosition] = useState<number | null>(null);
  const [activeAnnotation, setActiveAnnotation] = useState<Annotation | null>(
    null,
  );
  const stackedAnnotations = useMemo(
    function memoize() {
      return stackAnnotationsNoOverlap(
        annotations,
        Math.max(...sequences.map((seq) => seq.length)),
      );
    },
    [annotations],
  );
  const annotatedSequences = useMemo(
    function memoize() {
      return sequences.map((sequence) =>
        getAnnotatedSequence({ sequence, stackedAnnotations, noValidate }),
      );
    },
    [sequences, stackedAnnotations],
  );

  const memoizedSeqContent = useMemo(() => {
    return (
      <SeqContent
        annotatedSequences={annotatedSequences}
        selection={selection}
        setHoveredPosition={setHoveredPosition}
        setActiveAnnotation={setActiveAnnotation}
        stackedAnnotations={stackedAnnotations}
        charClassName={charClassName}
        selectionClassName={selectionClassName}
      />
    );
  }, [annotatedSequences, selection, stackedAnnotations]);
  return (
    <>
      <div
        className={classNames(
          "relative isolate flex flex-wrap",
          containerClassName,
        )}
      >
        <SeqMetadataBar
          hoveredPosition={hoveredPosition}
          activeAnnotation={activeAnnotation}
          className="sticky inset-x-0 top-0 z-[3] w-full bg-inherit px-2 py-1 backdrop-blur-md"
        />
        <div className="flex flex-wrap px-2">{memoizedSeqContent}</div>
      </div>
    </>
  );
};
export const SeqContent = ({
  annotatedSequences,
  selection,
  setHoveredPosition,
  setActiveAnnotation,
  stackedAnnotations,
  charClassName,
  selectionClassName,
}: {
  annotatedSequences: AnnotatedBase[][];
  selection: AriadneSelection | null;
  setHoveredPosition: (position: number | null) => void;
  setActiveAnnotation: (annotation: Annotation | null) => void;
  stackedAnnotations: StackedAnnotation[];
  charClassName: ({
    base,
    sequenceIdx,
  }: {
    base: AnnotatedBase;
    sequenceIdx: number;
  }) => string;
  selectionClassName?: string;
}) => {
  const indicesClassName = ({
    base,
    sequenceIdx,
  }: {
    base: AnnotatedBase;
    sequenceIdx: number;
  }) => {
    const isNotFirstSeq = sequenceIdx !== 0;
    const isNotMultipleOfTen = base.index % 10 !== 0;

    if (isNotFirstSeq || isNotMultipleOfTen) {
      return "opacity-0";
    }
    return classNames(
      "text-xs z-1",
      // don't allow selection of indices
      "dark:group-hover:text-zinc-300 group-hover:text-zinc-800",
      baseInSelection({
        baseIndex: base.index,
        selection,
        sequenceLength: annotatedSequences[sequenceIdx].length,
      })
        ? "text-brand-700 dark:text-brand-300"
        : "text-zinc-400 dark:text-zinc-600",
    );
  };
  return (
    <>
      {annotatedSequences[0].map(({ index: baseIdx }) => {
        return (
          <div
            className={classNames(
              "relative mt-4 flex flex-col justify-between",
              "group hover:bg-zinc-200 dark:hover:bg-zinc-600",
            )}
            key={`base-${baseIdx}`}
          >
            {annotatedSequences.map(
              (sequence: AnnotatedBase[], sequenceIdx) => {
                const base = sequence.find(
                  (base: AnnotatedBase) => base.index === baseIdx,
                ) || { base: " ", annotations: [], index: baseIdx };

                return (
                  <div
                    key={`sequence-${sequenceIdx}-base-${baseIdx}`}
                    className={classNames("whitespace-pre text-center")}
                    onMouseEnter={() => {
                      setHoveredPosition(base.index);
                    }}
                    onMouseLeave={() => setHoveredPosition(null)}
                  >
                    <CharComponent
                      char={`| ${base.index}`}
                      index={baseIdx}
                      charClassName={classNames(
                        "absolute -top-4 left-0",
                        "group-hover:text-brand-200 border-b border-zinc-600 group-hover:border-zinc-300",
                        indicesClassName({
                          base,
                          sequenceIdx,
                        }),
                      )}
                    />
                    <CharComponent
                      char={base.base}
                      index={baseIdx}
                      charClassName={classNames(
                        charClassName({
                          base,
                          sequenceIdx,
                        }),
                        baseInSelection({
                          baseIndex: baseIdx,
                          selection,
                          sequenceLength:
                            annotatedSequences[sequenceIdx].length,
                        }) &&
                          base.base !== " " &&
                          selectionClassName,
                      )}
                    />
                  </div>
                );
              },
            )}
            <SequenceAnnotation
              annotations={stackedAnnotations}
              index={baseIdx}
              maxAnnotationStack={Math.max(
                1,
                Math.max(...stackedAnnotations.map((ann) => ann.stack)),
              )}
              setHoveredPosition={setHoveredPosition}
              setActiveAnnotation={setActiveAnnotation}
              maxSequenceLength={Math.max(
                ...annotatedSequences.map((seq) => seq.length),
              )}
            />
          </div>
        );
      })}
    </>
  );
};

export const SeqMetadataBar = ({
  hoveredPosition,
  activeAnnotation,
  className,
}: {
  hoveredPosition: number | null;
  activeAnnotation: Annotation | null;
  className?: string;
}) => {
  const annotationDisplay = activeAnnotation ? (
    <span
      className={classNames(
        "flex gap-2 rounded-full px-2 py-px text-xs !opacity-100",
        activeAnnotation.className,
      )}
    >
      <span>Label: {activeAnnotation.text}</span>
      <span>Type: {activeAnnotation.type}</span>
      <span>Direction: {activeAnnotation.direction}</span>
      <span>
        from {activeAnnotation.start} - {activeAnnotation.end}
      </span>
    </span>
  ) : null;
  const positionDisplay = (
    <span className="text-xs text-black dark:text-white">
      Pos: {hoveredPosition ?? 0}
    </span>
  );
  return (
    <div
      className={classNames(
        "flex h-8 items-center justify-between gap-4 py-1 text-xs",
        className,
      )}
    >
      {positionDisplay}
      {annotationDisplay}
    </div>
  );
};

export const SequenceAnnotation = ({
  annotations,
  maxAnnotationStack,
  index,
  setHoveredPosition,
  setActiveAnnotation,
  maxSequenceLength,
}: {
  annotations: StackedAnnotation[];
  maxAnnotationStack: number;
  setHoveredPosition: (position: number | null) => void;
  setActiveAnnotation: (annotation: Annotation | null) => void;
  maxSequenceLength: number;
  index: number;
}) => {
  const orderedAnnotations = annotations.sort((a, b) => a.stack - b.stack);
  return (
    <div
      className=" "
      key={`annotation-${index}`}
      onMouseEnter={() => setHoveredPosition(index)}
      onMouseLeave={() => setHoveredPosition(null)}
    >
      {[...Array(maxAnnotationStack).keys()].map((i) => {
        const annotation = orderedAnnotations
          .filter((ann) =>
            baseInSelection({
              baseIndex: index,
              selection: ann,
              sequenceLength: maxSequenceLength,
            }),
          )
          .find((ann) => ann.stack === i);
        if (annotation) {
          if (
            !baseInSelection({
              baseIndex: index,
              selection: annotation,
              sequenceLength: maxSequenceLength,
            })
          ) {
            return (
              <div
                key={`annotation-${index}-${i}`}
                className={"h-3 border-b-2 border-zinc-100 opacity-10 "}
              />
            );
          }

          return (
            <div
              key={`annotation-${index}-${i}`}
              className={classNames(
                "group/annotation h-3 border-black group-hover/annotation:border",
                annotation.className,
              )}
              onClick={() =>
                annotation.onClick?.({
                  start: annotation.start,
                  end: annotation.end,
                  diection: annotation.direction,
                })
              }
              onMouseEnter={() => setActiveAnnotation(annotation)}
              onMouseLeave={() => setActiveAnnotation(null)}
            ></div>
          );
        } else {
          return <div key={`placeholder-${index}-${i}`} className={"h-3"} />;
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

export const CharComponent = ({ char, charClassName }: CharProps) => {
  // don't allow selection of chars
  const sharedClassName = "select-none font-mono";
  if (char === " ") {
    return (
      <div className={classNames(sharedClassName, charClassName, "opacity-20")}>
        .
      </div>
    );
  }
  return (
    <div className={classNames(sharedClassName, charClassName, "mr-px")}>
      {char}
    </div>
  );
};
