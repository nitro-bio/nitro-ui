import { useCircularSelectionRect } from "@Ariadne/hooks/useSelection";
import { getSubsequenceLength } from "@Ariadne/utils";
import { classNames } from "@utils/stringUtils";
import { useEffect, useRef } from "react";
import {
  AnnotatedSequence,
  AriadneSelection,
  StackedAnnotation,
} from "../types";
import { CircularAnnotationGutter } from "./CircularAnnotations";
import { CircularIndex } from "./CircularIndex";
import { findIndexFromAngle, genArc } from "./circularUtils";

export interface Props {
  sequence: AnnotatedSequence;
  stackedAnnotations: StackedAnnotation[];
  selection: AriadneSelection | null;
  setSelection: (selection: AriadneSelection) => void;
  containerClassName?: string;
}

const SVG_SIZE = 300;
const SVG_PADDING = 30;
export const CircularViewer = ({
  sequence,
  stackedAnnotations,
  selection,
  setSelection,
  containerClassName,
}: Props) => {
  const { cx, cy, sizeX, sizeY, radius } = {
    cx: SVG_SIZE / 2,
    cy: SVG_SIZE / 2,
    sizeX: SVG_SIZE,
    sizeY: SVG_SIZE,
    radius: (SVG_SIZE - SVG_PADDING) / 2,
  };

  const selectionRef = useRef<SVGSVGElement>(null);

  return (
    <div
      className={classNames(
        " flex select-none items-center justify-center font-thin",
        containerClassName,
      )}
    >
      <svg
        ref={selectionRef}
        viewBox={`0 0 ${sizeX} ${sizeY}`}
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="inherit"
        fontSize="inherit"
        fontWeight="inherit"
        className={`stroke-current`}
        width={sizeX}
        height={sizeY}
      >
        <CircularIndex
          cx={cx}
          cy={cy}
          radius={radius}
          sequence={sequence}
          ticks={8}
        />
        <CircularAnnotationGutter
          sequence={sequence}
          stackedAnnotations={stackedAnnotations}
          cx={cx}
          cy={cy}
          radius={radius}
        />
        <CircularSelection
          sequence={sequence}
          selection={selection}
          cx={cx}
          cy={cy}
          radius={radius}
          selectionRef={selectionRef}
          setSelection={setSelection}
        />

        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          fill="currentColor"
          stroke="currentColor"
          alignmentBaseline="middle"
          fontSize={"1rem"}
        >
          {sequence.length} bp
        </text>
      </svg>
    </div>
  );
};

const CircularSelection = ({
  radius,
  cx,
  cy,
  selection,
  selectionRef,
  setSelection,
  sequence,
}: {
  radius: number;

  cx: number;
  cy: number;
  selectionRef: React.RefObject<SVGSVGElement>;
  setSelection: (selection: AriadneSelection) => void;
  selection: AriadneSelection | null;
  sequence: AnnotatedSequence;
}) => {
  /* Collect internal selection data and propogate up */
  const {
    start: internalSelectionStart,
    end: internalSelectionEnd,
    direction: internalDirection,
  } = useCircularSelectionRect(selectionRef);
  useEffect(
    function propagateSelectionUp() {
      if (
        selectionRef.current &&
        internalSelectionStart &&
        internalSelectionEnd &&
        internalDirection
      ) {
        const start = findIndexFromAngle({
          angle: internalSelectionStart,
          seqLength: sequence.length,
        });
        const end = findIndexFromAngle({
          angle: internalSelectionEnd,
          seqLength: sequence.length,
        });
        const direction =
          internalDirection === "clockwise" ? "forward" : "reverse";

        const prevLength = selection
          ? Math.abs(selection.end - selection.start)
          : 0;
        const newLength = getSubsequenceLength(
          { start, end, direction },
          sequence.length,
        );
        const deltaLength = Math.abs(prevLength - newLength);
        const deltaThreshold = Math.max(0.7 * sequence.length, 10);
        if (deltaLength > deltaThreshold && selection) {
          // preserve initial direction
          setSelection({
            start,
            end,
            direction: selection?.direction,
          });

          return;
        }
        setSelection({
          start,
          end,
          direction,
        });
      }
    },
    [internalSelectionStart, internalSelectionEnd],
  );

  if (selection === null) {
    return null;
  }

  /* Display selection data that has trickled down */
  const { start, end, direction } = selection;
  if (start === null || end === null) {
    return null;
  }
  const center = { x: cx, y: cy };
  const innerRadius = radius;
  const outerRadius = radius + 10;
  const length = getSubsequenceLength(selection, sequence.length);

  const offset = direction === "forward" ? start : end;
  const seqLength = sequence.length;

  const arc = genArc({
    center,
    innerRadius,
    largeArc: length > seqLength / 2,
    length,
    offset,
    outerRadius,
    seqLength,
  });
  return (
    <g>
      <path
        d={arc}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
};
