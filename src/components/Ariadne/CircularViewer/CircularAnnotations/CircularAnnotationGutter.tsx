import { Fragment } from "react";

import type { AnnotatedSequence, Annotation } from "@Ariadne/types";
import { stackElements } from "@Ariadne/utils";
import { CircularAnnotation } from "./CircularAnnotation";

export const CircularAnnotationGutter = ({
  annotations,
  cx,
  cy,
  radius,
  sequence,
}: {
  annotations: Annotation[];
  cx: number;
  cy: number;
  radius: number;
  sequence: AnnotatedSequence;
}) => {
  const gutterRadius = radius * 0.3;
  const stackedAnnotations = stackElements(annotations);
  return (
    <g>
      <circle cx={cx} cy={cy} r={gutterRadius} fill="none" strokeWidth={0.8} />;
      {stackedAnnotations.map((annotations, stackIdx) => (
        <Fragment key={`annotation-stack-${stackIdx}`}>
          {annotations.map((annotation) => (
            <CircularAnnotation
              key={`stack-${stackIdx}-${annotation.start}-${annotation.end}-${annotation.text}`}
              annotation={annotation}
              radius={gutterRadius + stackIdx * 6}
              center={{ x: cx, y: cy }}
              sequence={sequence}
            />
          ))}
        </Fragment>
      ))}
    </g>
  );
};
