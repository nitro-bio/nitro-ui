import { Fragment } from "react";

import type { Annotation } from "@Ariadne/types";
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
  sequence: string;
}) => {
  const gutterRadius = radius * 0.5;
  const stackedAnnotations = stackElements(annotations);

  return (
    <g className="text-brand-800">
      <circle cx={cx} cy={cy} r={gutterRadius} fill="none" strokeWidth={0.8} />;
      {stackedAnnotations.map((annotations, stackIdx) => (
        <Fragment key={`annotation-stack-${stackIdx}`}>
          {annotations.map((annotation) => (
            <CircularAnnotation
              key={`stack-${stackIdx}-${annotation.start}-${annotation.end}-${annotation.text}`}
              annotation={annotation}
              radius={gutterRadius + stackIdx * 10}
              center={{ x: cx, y: cy }}
              sequence={sequence}
            />
          ))}
        </Fragment>
      ))}
    </g>
  );
};
