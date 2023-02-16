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

  const arcPath = genArc({
    innerRadius: radius,
    outerRadius: radius + 5,
    largeArc: false,
    length: annotation.end - annotation.start,
    direction: annotation.direction,
    seqLength: sequence.length,
    offset: annotation.start,
    center: { x: cx, y: cy },
  });

  return (
    <svg
      className={classNames(annotation.className)}
      onClick={() => {
        annotation.onClick(annotation);
      }}
    >
      <path d={arcPath}>
        <text>Annotation</text>
      </path>
    </svg>
  );
};
