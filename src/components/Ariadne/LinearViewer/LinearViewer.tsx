import { useLinearSelectionRect } from "@Ariadne/hooks/useSelection";
import { getAnnotatedSequence, getSubsequenceLength } from "@Ariadne/utils";
import { classNames } from "@utils/stringUtils";
import { useEffect, useMemo, useRef } from "react";
import {
  AnnotatedSequence,
  AriadneSelection,
  Annotation,
  AnnotatedBase,
} from "../types";
import { stackAnnsByType } from "@Ariadne/genbankUtils";
import { LinearAnnotationGutter } from "./LinearAnnotationGutter";

export interface Props {
  sequences: string[];
  annotations: Annotation[];
  selection: AriadneSelection | null;
  setSelection: (selection: AriadneSelection | null) => void;
  onDoubleClick?: () => void;
  selectionClassName?: (selection: AriadneSelection) => string;
  containerClassName?: string;
  sequenceClassName: ({ sequenceIdx }: { sequenceIdx: number }) => string;
  mismatchClassName?: (mismatchedBase: AnnotatedBase) => string;
}

export const LinearViewer = (props: Props) => {
  const {
    sequences,
    selection,
    annotations,
    setSelection,
    onDoubleClick,
    selectionClassName,
    mismatchClassName,
    containerClassName,
    sequenceClassName,
  } = props;

  const stackedAnnotations = useMemo(
    function memoize() {
      return stackAnnsByType(annotations);
    },
    [annotations],
  );

  const annotatedSequences = useMemo(
    function memoize() {
      return sequences.map((sequence) =>
        getAnnotatedSequence({ sequence, stackedAnnotations }),
      );
    },
    [sequences, stackedAnnotations],
  );

  const rootSequence = annotatedSequences[0];
  const selectionRef = useRef<SVGSVGElement>(null);

  // const numberOfTicks = 5;
  // const basesPerTick = Math.floor(sequence.length / numberOfTicks);

  const SVG_WIDTH = 500;
  const SVG_HEIGHT = sequences.length * 10 + 10;

  return (
    <div className={containerClassName || ""}>
      <svg
        ref={selectionRef}
        className={classNames("select-none font-thin")}
        onDoubleClick={onDoubleClick}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {annotatedSequences.map((sequence, i) => (
            <g key={`Sequence-${i}`}>
              <SequenceLine
                sequenceClassName={sequenceClassName}
                sequence={sequence}
                otherSequences={annotatedSequences.filter((_, j) => j !== i)}
                sequenceIdx={i}
                rootSequence={rootSequence}
                mismatchClassName={mismatchClassName}
              />
            </g>
          ))}
        </g>
        <LinearSelection
          selectionClassName={selectionClassName}
          selectionRef={selectionRef}
          selection={selection}
          setSelection={setSelection}
          sequence={rootSequence}
        />
      </svg>
      {stackedAnnotations.length > 0 && (
        <LinearAnnotationGutter
          containerClassName=""
          stackedAnnotations={stackedAnnotations}
          sequence={rootSequence}
        />
      )}
    </div>
  );
};

const SequenceLine = ({
  rootSequence,
  sequence,
  sequenceIdx,
  otherSequences,
  sequenceClassName,
  mismatchClassName,
}: {
  rootSequence: AnnotatedSequence;
  sequence: AnnotatedSequence;
  sequenceIdx: number;
  otherSequences: AnnotatedSequence[];
  sequenceClassName: ({ sequenceIdx }: { sequenceIdx: number }) => string;
  mismatchClassName?: (mismatchedBase: AnnotatedBase) => string;
}) => {
  const start = sequence[0]?.index;
  if (start === undefined) {
    throw new Error(`Sequence must have at least one base ${sequence}`);
  }
  const end = sequence[sequence.length - 1]?.index;
  if (end === undefined) {
    throw new Error(`Sequence must have at least one base ${sequence}`);
  }

  let maxEnd = end;
  otherSequences.forEach((otherSequence) => {
    const otherEnd = otherSequence.at(otherSequence.length - 1)?.index;
    if (otherEnd === undefined) {
      throw new Error(
        `otherSequence must have at least one base ${otherSequence}`,
      );
    }

    if (otherEnd > maxEnd) {
      maxEnd = otherEnd;
    }
  });
  const startPerc = start / maxEnd;
  const endPerc = end / maxEnd;

  // mismatches
  const mismatches = sequence.filter((base) => {
    const rootBase = rootSequence.at(base.index);
    return rootBase && rootBase.base !== base.base;
  });
  mismatchClassName =
    mismatchClassName ??
    function mismatchClassName(mismatch: AnnotatedBase) {
      if (mismatch.base === "-") {
        return "fill-red-600 stroke-red-600";
      } else {
        return "fill-noir-800 stroke-noir-800";
      }
    };

  return (
    <>
      <line
        className={classNames("", sequenceClassName({ sequenceIdx }))}
        x1={`${startPerc * 100}%`}
        y1={`${sequenceIdx * 10 + 10}`}
        x2={`${endPerc * 100}%`}
        y2={`${sequenceIdx * 10 + 10}`}
        strokeWidth={5}
        stroke="currentColor"
      />
      {mismatches.map((base) => {
        const xPerc = (base.index / maxEnd) * 100;
        const width = Math.max((1 / sequence.length) * 100, 0.25);

        return (
          <g
            className={classNames(mismatchClassName?.(base) || "bg-red-400")}
            key={`sequence-${sequenceIdx}-mismatch-${base.index}`}
          >
            <line
              x1={`${xPerc - width / 2}%`}
              y1={`${sequenceIdx * 10 + 10}`}
              x2={`${xPerc + width / 2}%`}
              y2={`${sequenceIdx * 10 + 10}`}
              strokeWidth={5}
            />
          </g>
        );
      })}
    </>
  );
};

const LinearSelection = ({
  selection,
  selectionRef,
  setSelection,
  sequence,
  selectionClassName,
}: {
  selectionRef: React.RefObject<SVGSVGElement>;
  setSelection: (selection: AriadneSelection) => void;
  selection: AriadneSelection | null;
  sequence: AnnotatedSequence;
  selectionClassName?: (selection: AriadneSelection) => string;
}) => {
  const {
    start: internalSelectionStart,
    end: internalSelectionEnd,
    direction: internalDirection,
  } = useLinearSelectionRect({ ref: selectionRef });
  useEffect(
    function propagateSelectionUp() {
      if (
        selectionRef.current &&
        internalSelectionStart &&
        internalSelectionEnd
      ) {
        const svgWidth = selectionRef.current?.getBoundingClientRect().width;
        const start = Math.floor(
          (internalSelectionStart.x / svgWidth) * sequence.length,
        );
        const end = Math.floor(
          (internalSelectionEnd.x / svgWidth) * sequence.length,
        );

        // show a very small first selection result as start === end because the user probably doesn't want the entire sequence to be highlighted every time they click
        if (selection == null || start === end) {
          setSelection({
            start,
            end: internalDirection === "forward" ? start + 1 : start - 1,
            direction: internalDirection,
          });
          return;
        } else {
          setSelection({ start, end, direction: internalDirection });
        }
      }
    },
    [internalSelectionStart, internalSelectionEnd],
  );

  if (!selection) {
    return null;
  }

  /* Display selection data that has trickled down */
  const { start, end, direction } = selection;

  // basic case
  let firstRectStart = (Math.min(start, end) / sequence.length) * 100;
  let firstRectWidth =
    (getSubsequenceLength(selection, sequence.length) / sequence.length) * 100;
  let secondRectStart = null;
  let secondRectWidth = null;

  // TODO: abstract this and logic in LinearAnnotation into helper functions
  const selectionSpansSeam =
    selection.direction === "forward"
      ? selection.start > selection.end
      : selection.end > selection.start;

  /* if direction is backward and end > start we need to render two rectangles */
  if (selectionSpansSeam) {
    firstRectStart = 0;

    if (direction === "forward") {
      firstRectWidth = (end / sequence.length) * 100;
      secondRectStart = (start / sequence.length) * 100;
      secondRectWidth = ((sequence.length - start) / sequence.length) * 100;
    }
    if (direction === "reverse") {
      firstRectWidth = (start / sequence.length) * 100;
      secondRectStart = (end / sequence.length) * 100;
      secondRectWidth = ((sequence.length - end) / sequence.length) * 100;
    }
  }

  return (
    <g
      className={classNames(
        "fill-current stroke-current",
        selectionClassName?.(selection),
      )}
    >
      <rect
        x={`${firstRectStart}%`}
        width={`${firstRectWidth}%`}
        y={`0%`}
        height={`100%`}
        fill="currentColor"
        fillOpacity={0.2}
        strokeWidth={1.5}
      />
      {secondRectStart && secondRectWidth && (
        <rect
          x={`${secondRectStart}%`}
          width={`${secondRectWidth}%`}
          y={`0%`}
          height={`100%`}
          fill="currentColor"
          fillOpacity={0.2}
          strokeWidth={1.5}
        />
      )}
    </g>
  );
};
