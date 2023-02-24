import { useLinearSelectionRect } from "@Ariadne/hooks/useSelection";
import { getSubsequenceLength } from "@Ariadne/utils";
import { classNames } from "@utils/stringUtils";
import { useEffect, useRef, useState } from "react";
import {
  AnnotatedSequence,
  AriadneSelection,
  StackedAnnotation,
} from "../types";

export interface Props {
  sequences: AnnotatedSequence[];
  annotations: StackedAnnotation[];
  selection: AriadneSelection | null;
  setSelection: (selection: AriadneSelection | null) => void;
  onDoubleClick?: () => void;
  selectionClassName?: (selection: AriadneSelection) => string;
  cursorClassName?: string;
  containerClassName?: string;
  sequenceClassName: (sequenceIdx: number) => string;
}

export const SVG_WIDTH = 500;
export const SVG_HEIGHT = 100;

export const LinearViewer = (props: Props) => {
  const {
    sequences,
    selection,
    setSelection,
    onDoubleClick,
    selectionClassName,
    cursorClassName,
    containerClassName,
    sequenceClassName,
  } = props;

  const rootSequence = sequences[0];
  const selectionRef = useRef<SVGSVGElement>(null);

  // const numberOfTicks = 5;
  // const basesPerTick = Math.floor(sequence.length / numberOfTicks);

  return (
    <svg
      ref={selectionRef}
      className={classNames(containerClassName || "", "select-none font-thin")}
      onDoubleClick={onDoubleClick}
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {sequences.map((sequence, i) => (
          <g key={`Sequence-${i}`}>
            <SequenceLine
              sequenceClassName={sequenceClassName}
              sequence={sequence}
              otherSequences={sequences.filter((_, j) => j !== i)}
              sequenceIdx={i}
              rootSequence={rootSequence}
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
  );
};

const SequenceLine = ({
  rootSequence,
  sequence,
  sequenceIdx,
  otherSequences,
  sequenceClassName,
}: {
  rootSequence: AnnotatedSequence;
  sequence: AnnotatedSequence;
  sequenceIdx: number;
  otherSequences: AnnotatedSequence[];
  sequenceClassName: (sequenceIdx: number) => string;
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
        `otherSequence must have at least one base ${otherSequence}`
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
  return (
    <>
      <line
        className={classNames("", sequenceClassName(sequenceIdx))}
        x1={`${startPerc * 100}%`}
        y1={`${sequenceIdx * 10 + 10}`}
        x2={`${endPerc * 100}%`}
        y2={`${sequenceIdx * 10 + 10}`}
        strokeWidth={5}
        stroke="currentColor"
      />
      {mismatches.map((base) => {
        const xPerc = (base.index / maxEnd) * 100;
        return (
          <g
            className={"fill-noir-800 stroke-noir-800"}
            key={`sequence-${sequenceIdx}-mismatch-${base.index}`}
          >
            <line
              x1={`${xPerc}%`}
              y1={`${sequenceIdx * 10 + 10}`}
              x2={`${xPerc + 1}%`}
              y2={`${sequenceIdx * 10 + 10}`}
              strokeWidth={3}
            />
          </g>
        );
      })}
    </>
  );
};
const LinearCursor = ({
  selection,
  selectionRef,
  cursorClassName,
}: {
  selection: AriadneSelection | null;
  selectionRef: React.RefObject<SVGSVGElement>;
  cursorClassName?: string;
}) => {
  const [xPerc, setXPerc] = useState(0);

  useEffect(
    function hideOnSelection() {
      const selectionActive = selection && selection.start !== selection.end;
      if (selectionActive) {
        setXPerc(-1);
      }
    },
    [selection]
  );

  useEffect(
    function mountMouseMoveListener() {
      const node = selectionRef.current;
      const onMouseMove = (e: MouseEvent) => {
        const selectionActive = selection && selection.start !== selection.end;
        if (selectionRef.current && !selectionActive) {
          const { clientX } = e;
          const { left, right } =
            selectionRef.current.getBoundingClientRect() || {
              left: 0,
              right: 0,
            };
          const xRelative = clientX - left;
          const nodeWidth = right - left;
          const xPerc = xRelative / nodeWidth;
          setXPerc(xPerc * 100);
        }
      };

      if (node) {
        node.addEventListener("mousemove", onMouseMove);
      }
      return () => {
        node?.removeEventListener("mousemove", onMouseMove);
      };
    },
    [selectionRef, selection]
  );

  return (
    <g className={classNames(cursorClassName || "stroke-noir-800")}>
      <line
        x1={`${xPerc}%`}
        y1={`${50}%`}
        x2={`${xPerc + 1}%`}
        y2={`${50}%`}
        strokeWidth={5}
        stroke="currentColor"
      />
    </g>
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
  } = useLinearSelectionRect(selectionRef);
  useEffect(
    function propagateSelectionUp() {
      if (
        selectionRef.current &&
        internalSelectionStart &&
        internalSelectionEnd
      ) {
        const svgWidth = selectionRef.current?.getBoundingClientRect().width;
        const start = Math.floor(
          (internalSelectionStart.x / svgWidth) * sequence.length
        );
        const end = Math.floor(
          (internalSelectionEnd.x / svgWidth) * sequence.length
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
    [internalSelectionStart, internalSelectionEnd]
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
        selectionClassName?.(selection)
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

const Ticks = ({
  basesPerTick,
  totalBases,
  numberOfTicks,
}: {
  basesPerTick: number;
  totalBases: number;
  numberOfTicks: number;
}) => {
  return (
    <g>
      {[...Array(numberOfTicks).keys()].map((i) => {
        const { x1, x2 } = {
          x1: ((i * basesPerTick) / totalBases) * 100,
          x2: ((i * basesPerTick) / totalBases) * 100,
        };
        const { y1, y2 } = { y1: 50, y2: 25 };
        return (
          <g key={`tick-${i}`} className="fill-current text-current">
            <line
              id={`tick-${i}`}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="currentColor"
              strokeWidth={0.5}
            />
            <text x={`${x2}%`} y={`${y2}%`} textAnchor="start" fontSize="0.5em">
              {i * basesPerTick}
            </text>
          </g>
        );
      })}
    </g>
  );
};
