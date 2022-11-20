import { genArc } from "../circularUtils";
import type { Annotation, Coor } from "@Ariadne/types";

export const CircularAnnotation = ({
  sequence,
  annotation,
  radius,
  center,
}: {
  sequence: string;
  radius: number;
  annotation: Annotation;

  center: Coor;
}) => {
  const { x: cx, y: cy } = center;
  /* draw an svg path for an arc of quadrant 1 of a circl */
  const arcPath = genArc({
    innerRadius: radius,
    outerRadius: radius + 5,
    largeArc: false,
    length: annotation.end - annotation.start,
    sweepFWD: true,
    seqLength: sequence.length,
    offset: annotation.start,
    center: { x: cx, y: cy },
  });

  return (
    <svg className={`${annotation.color} fill-current`}>
      <path d={arcPath} fill="currentColor" stroke="currentColor">
        <text>Annotation</text>
      </path>
    </svg>
  );
};
