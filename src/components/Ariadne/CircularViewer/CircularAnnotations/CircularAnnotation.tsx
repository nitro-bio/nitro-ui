import { genArc } from "../circularUtils";
import type { AnnotatedSequence, Annotation, Coor } from "@Ariadne/types";
import { classNames } from "@utils/stringUtils";
import { getSubsequenceLength } from "@Ariadne/utils";

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

  const annotationLength = getSubsequenceLength(annotation, sequence.length);
  const arcPath = genArc({
    innerRadius: radius,
    outerRadius: radius + 5,
    largeArc: annotationLength > sequence.length / 2,
    length: annotationLength,
    seqLength: sequence.length,
    offset:
      annotation.direction === "forward" ? annotation.start : annotation.end,
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
        <title>{annotation.text}</title>
        <text>Annotation</text>
      </path>
    </svg>
  );
};
