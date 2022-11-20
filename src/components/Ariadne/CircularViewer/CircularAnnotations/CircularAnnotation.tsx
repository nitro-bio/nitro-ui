import { genArc } from "../circularUtils";
import type { AnnotatedSequence, Annotation, Coor } from "@Ariadne/types";

export const CircularAnnotation = ({
  sequence,
  annotation,
  radius,
  center,
}: {
  sequence: AnnotatedSequence;
  radius: number;
  annotation: Annotation;

  center: Coor;
}) => {
  const { x: cx, y: cy } = center;
  /* draw an svg path for an arc of quadrant 1 of a circl */
  console.table({ ...annotation, length: annotation.end - annotation.start });

  /* if the annotation spans the seam, we start the arc beginning at the end (negative offset) and then draw from there */
  const annotationSpansSeam = annotation.end < annotation.start;
  const offset = annotationSpansSeam
    ? annotation.start
    : sequence.length - annotation.end;
  const arcPath = genArc({
    innerRadius: radius,
    outerRadius: radius + 5,
    largeArc: false,
    length: annotation.end - annotation.start,
    sweepFWD: true,
    seqLength: sequence.length,
    offset,
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
