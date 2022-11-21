import { genArc } from "../circularUtils";
import type { AnnotatedSequence, Annotation, Coor } from "@Ariadne/types";

export const CircularAnnotation = ({
  sequence,
  annotation,
  radius,
  center,
  index,
}: {
  sequence: AnnotatedSequence;
  radius: number;
  annotation: Annotation;
  index: string;
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
      <path id={`curve-${index}`} d={arcPath} />

      <text
        dx={5}
        dy={5}
        fill="black"
        stroke="black"
        strokeWidth={0.5}
        alignmentBaseline="middle"
        fontSize={"0.5rem"}
      >
        <textPath href={`#curve-${index}`}>test</textPath>
      </text>
    </svg>
  );
};
