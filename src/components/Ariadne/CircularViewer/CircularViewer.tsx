import CircularIndex from "./CircularIndex";
import CircularAnnotationGutter from "./CircularAnnotations";
import { AnnotatedSequence, Annotation } from "../types";
import { useState } from "react";

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
  const [scrollVal, setScrollVal] = useState(0);

  const handleScroll = (e: React.WheelEvent<SVGSVGElement>) => {
    /* smooth out scroll value */

    setScrollVal(Math.round(e.deltaY / 10) + scrollVal);
  };

  return (
    <div className="font-mono flex items-center justify-center font-thin text-brand-400">
      <svg
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
