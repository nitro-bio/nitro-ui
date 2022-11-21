import CircularIndex from "./CircularIndex";
import CircularAnnotationGutter from "./CircularAnnotations";
import { AnnotatedSequence, Annotation, AriadneSelection } from "../types";
import { useEffect, useRef, useState } from "react";
import { useSelectionRect } from "@Ariadne/hooks/useSelectionRect";
import { findIndexFromCoor, genArc } from "./circularUtils";

export interface Props {
  sequence: AnnotatedSequence;
  size: number;
  annotations: Annotation[];
}

export const CircularViewer = ({ sequence, size, annotations }: Props) => {
  const { cx, cy, sizeX, sizeY, radius } = {
    cx: size / 2,
    cy: size / 2,
    sizeX: size,
    sizeY: size,
    radius: (size - 10) / 2,
  };
  const [selection, setSelection] = useState<AriadneSelection>([null, null]);
  const selectionRef = useRef<SVGSVGElement>(null);

  return (
    <div className="font-mono flex select-none items-center justify-center font-thin text-brand-400">
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
        <CircularIndex cx={cx} cy={cy} radius={radius} sequence={sequence} />
        <CircularAnnotationGutter
          sequence={sequence}
          annotations={annotations}
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
  selection: AriadneSelection;
  sequence: AnnotatedSequence;
}) => {
  /* Collect internal selection data and propogate up */
  const { start: internalSelectionStart, end: internalSelectionEnd } =
    useSelectionRect(selectionRef);
  useEffect(
    function propagateSelectionUp() {
      if (
        selectionRef.current &&
        internalSelectionStart &&
        internalSelectionEnd
      ) {
        const start = findIndexFromCoor({
          coor: internalSelectionStart,
          center: { x: cx, y: cy },
          seqLength: sequence.length,
        });
        const end = findIndexFromCoor({
          coor: internalSelectionEnd,
          center: { x: cx, y: cy },
          seqLength: sequence.length,
        });
        setSelection([start, end]);
      }
    },
    [internalSelectionStart, internalSelectionEnd]
  );

  /* Display selection data that has trickled down */
  const [start, end] = selection;
  if (start === null || end === null) {
    return null;
  }
  const center = { x: cx, y: cy };
  const innerRadius = radius - 20;
  const outerRadius = radius;
  const length = Math.abs(end - start);
  const offset = Math.min(start, end);
  const seqLength = sequence.length;
  console.table({ start, end, length, offset, seqLength });
  const arc = genArc({
    center,
    innerRadius,
    largeArc: length > seqLength / 2 ? true : false,
    length,
    offset,
    outerRadius,
    seqLength,
    sweepFWD: true,
  });
  return (
    <path
      d={arc}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};
