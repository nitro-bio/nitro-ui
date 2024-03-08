import { Fragment } from "react";

import type { AnnotatedSequence, StackedAnnotation } from "@Ariadne/types";
import { CircularAnnotation } from "./CircularAnnotation";
import { clampSlice } from "../circularUtils";

export const CircularAnnotationGutter = ({
  stackedAnnotations,
  cx,
  cy,
  radius,
  annotatedSequence,
}: {
  stackedAnnotations: StackedAnnotation[];
  cx: number;
  cy: number;
  radius: number;
  annotatedSequence: AnnotatedSequence;
}) => {
  const gutterRadius = radius * 0.3;
  const firstIdx =
    annotatedSequence.length > 0 ? annotatedSequence.at(0)!.index : 0;
  const lastIdx =
    annotatedSequence.length > 0 ? annotatedSequence.at(-1)!.index : 0;
  stackedAnnotations = stackedAnnotations
    .map((annotation) => {
      const clampedBounds = clampSlice({
        slice: annotation,
        firstIdx,
        lastIdx,
      });
      if (!clampedBounds) {
        return null;
      }
      return {
        ...annotation,
        start: clampedBounds.start,
        end: clampedBounds.end,
      };
    })
    .filter(Boolean) as StackedAnnotation[]; // filter ensures that the array is of type StackedAnnotation[]
  const stacks: StackedAnnotation[][] = [];
  stackedAnnotations.forEach((ann) => {
    stacks[ann.stack] = stacks[ann.stack] || [];
    stacks[ann.stack].push(ann);
  });

  return (
    <g>
      <circle cx={cx} cy={cy} r={gutterRadius} fill="none" strokeWidth={0.8} />;
      {stacks.map((annotations, stackIdx) => (
        <Fragment key={`annotation-stack-${stackIdx}`}>
          {annotations.map((annotation) => (
            <CircularAnnotation
              key={`stack-${stackIdx}-${annotation.start}-${annotation.end}-${annotation.text}`}
              annotation={annotation}
              radius={gutterRadius + stackIdx * 6}
              center={{ x: cx, y: cy }}
              sequence={annotatedSequence}
            />
          ))}
        </Fragment>
      ))}
    </g>
  );
};
