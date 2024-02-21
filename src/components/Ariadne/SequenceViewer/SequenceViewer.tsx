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
  const indicesClassName = ({
    base,
    sequenceIdx,
  }: {
    base: AnnotatedBase;
    sequenceIdx: number;
  }) => {
    const isNotFirstOrLast =
      sequenceIdx !== 0 && sequenceIdx !== sequences.length - 1;
    const isNotMultipleOfTen = base.index % 10 !== 0;
    const onlyTwoSequencesAndIsSecondSeq =
      sequences.length === 2 && sequenceIdx === 1;

    if (
      isNotFirstOrLast ||
      isNotMultipleOfTen ||
      onlyTwoSequencesAndIsSecondSeq
    ) {
      return "opacity-0";
    }
    return classNames(
      "text-xs ",
      "group-hover:text-zinc-300",
      baseInSelection(base.index, selection)
        ? "text-brand-300"
        : "text-zinc-600",
    );
  };
  return (
    <>
      <div className={classNames("mt-16 flex flex-wrap", containerClassName)}>
        {sequences[0].map(({ index: baseIdx }) => {
          return (
            <div
              className={classNames(
                "my-2 flex flex-col justify-between",
                "group hover:bg-zinc-600",
              )}
              key={`base-${baseIdx}`}
            >
              {sequences.map((sequence: AnnotatedBase[], sequenceIdx) => {
                const base = sequence.find(
                  (base: AnnotatedBase) => base.index === baseIdx,
                ) || { base: " ", annotations: [], index: baseIdx };

                return (
                  <div
                    key={`sequence-${sequenceIdx}-base-${baseIdx}`}
                    className={classNames(
                      "relative mt-4 whitespace-pre text-center",
                    )}
                  >
                    <CharComponent
                      char={`| ${base.index}`}
                      index={baseIdx}
                      charClassName={classNames(
                        "absolute -top-4 left-0 z-10",
                        "group-hover:text-brand-200",
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
                        baseInSelection(baseIdx, selection) &&
                          base.base !== " " &&
                          selectionClassName,
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
  if (orderedAnnotations.length === 0) {
    return <div className={"h-3"} />;
  }
  return (
    <div className="relative " key={`annotation-${index}`}>
      {[...Array(maxAnnotationStack).keys()].map((i) => {
        const annotation = orderedAnnotations.find((a) => a.stack === i);
        if (annotation) {
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
            >
              <div
                className={classNames(
                  "absolute -top-28 z-10 hidden flex-col items-start rounded-md px-2 py-1 text-xs group-hover/annotation:flex ",
                  annotation.className,
                )}
              >
                <span>Pos: {index}</span>
                <span>{annotation.text}</span>
                <span>{annotation.type}</span>
              </div>
            </div>
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

const CharComponent = ({ char, charClassName }: CharProps) => (
  <div className={classNames(charClassName, "mr-px font-mono")}>{char}</div>
);
