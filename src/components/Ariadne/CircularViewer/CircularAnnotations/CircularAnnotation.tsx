import { genArc } from "../circularUtils";
import type { AnnotatedSequence, Annotation, Coor } from "@Ariadne/types";
import { classNames } from "@utils/stringUtils";

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
  const annotationSpansSeam = annotation.end < annotation.start;
  const offset = annotationSpansSeam
    ? annotation.start
    : sequence.length - annotation.end;
  const arcPath = genArc({
    innerRadius: radius,
    outerRadius: radius + 5,
    largeArc: false,
    length: annotation.end - annotation.start,
    direction: "forward" /* TODO: use annotation direction */,
    seqLength: sequence.length,
    offset,
    center: { x: cx, y: cy },
  });

  return (
    <svg
      className={classNames(annotation.className)}
      onClick={() => {
        console.log("clicked annotation", annotation);
        annotation.onClick(annotation);
      }}
    >
      <path d={arcPath}>
        <text>Annotation</text>
      </path>
    </svg>
  );
};
