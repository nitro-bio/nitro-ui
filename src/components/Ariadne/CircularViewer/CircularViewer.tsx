import { useCircularSelectionRect } from "@Ariadne/hooks/useSelection";
import { useEffect, useRef, useState } from "react";
import { AnnotatedSequence, Annotation, AriadneSelection } from "../types";
import CircularAnnotationGutter from "./CircularAnnotations";
import CircularIndex from "./CircularIndex";
import { findIndexFromAngle, genArc } from "./circularUtils";

export interface Props {
  sequence: AnnotatedSequence;
  annotations: Annotation[];
  selection: AriadneSelection | null;
  setSelection: (selection: AriadneSelection) => void;
}

const SVG_SIZE = 300;

export const CircularViewer = ({
  sequence,
  annotations,
  selection,
  setSelection,
}: Props) => {
  const { cx, cy, sizeX, sizeY, radius } = {
    cx: SVG_SIZE / 2,
    cy: SVG_SIZE / 2,
    sizeX: SVG_SIZE,
    sizeY: SVG_SIZE,
    radius: (SVG_SIZE - 10) / 2,
  };
  const [scrollVal, setScrollVal] = useState(0);

  const handleScroll = (e: React.WheelEvent<SVGSVGElement>) => {
    /* smooth out scroll value */
    setScrollVal(Math.round(e.deltaY / 10) + scrollVal);
  };

  const selectionRef = useRef<SVGSVGElement>(null);

  return (
    <div className="font-mono flex select-none items-center justify-center font-thin text-brand-800 dark:text-brand-600">
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
        onWheel={(e) => handleScroll(e)}
      >
        <CircularIndex
          cx={cx}
          cy={cy}
          radius={radius}
          sequence={sequence}
          scrollVal={scrollVal}
        />
        <CircularAnnotationGutter
          sequence={sequence}
          annotations={annotations}
          cx={cx}
          cy={cy}
          radius={radius}
          scrollVal={scrollVal}
        />
        <CircularSelection
          sequence={sequence}
          selection={selection}
          cx={cx}
          cy={cy}
          radius={radius}
          selectionRef={selectionRef}
          setSelection={setSelection}
          scrollVal={scrollVal}
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
  scrollVal,
}: {
  radius: number;
  scrollVal: number;
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
        let prevLength = selection
          ? Math.abs(selection.end - selection.start)
          : 0;
        let newLength = Math.abs(end - start);
        if (internalDirection === "counterclockwise" && selection) {
          prevLength = selection.end + sequence.length - selection.start;
          newLength = end + sequence.length - start;
        }
        const deltaLength = Math.abs(prevLength - newLength);
        const deltaThreshold = Math.max(0.7 * sequence.length, 10);
        if (deltaLength > deltaThreshold && selection) {
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
          direction: internalDirection === "clockwise" ? "forward" : "reverse",
        });
      }
    },
    [internalSelectionStart, internalSelectionEnd]
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
  const innerRadius = radius - 10;
  const outerRadius = radius;
  let length = -1;
  if (end > start) {
    if (direction === "forward") {
      length = end - start;
    } else {
      length = sequence.length - end + start;
    }
  } else {
    if (direction === "forward") {
      length = sequence.length - start + end;
    } else {
      length = start - end;
    }
  }

  const offset = direction === "forward" ? start : end;
  const seqLength = sequence.length;
  /* console.table({ start, end, direction, length, offset, seqLength }); */

  const arc = genArc({
    center,
    innerRadius,
    largeArc: length > seqLength / 2 ? true : false,
    length,
    offset,
    outerRadius,
    seqLength,
    direction,
  });
  return (
    <g transform={`rotate(${scrollVal} ${cx} ${cy})`}>
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
