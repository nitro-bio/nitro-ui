import { classNames } from "@utils/stringUtils";
import { Fragment } from "react";
import { AnnotatedSequence, Annotation, StackedAnnotation } from "../types";

export const LinearAnnotationGutter = ({
  stackedAnnotations,
  sequence,
  containerClassName,
}: {
  stackedAnnotations: StackedAnnotation[];
  sequence: AnnotatedSequence;
  containerClassName?: string;
}) => {
  const stacks: StackedAnnotation[][] = [];
  stackedAnnotations.forEach((ann) => {
    stacks[ann.stack] = stacks[ann.stack] || [];
    stacks[ann.stack].push(ann);
  });
  return (
    <div
      className={classNames(
        "block overflow-hidden grid grid-cols-1 grid-rows-auto",
        containerClassName
      )}
    >
      {stacks.map((annotations, stackIdx) => (
        <div className="h-full" key={`annotation-stack-${stackIdx}`}>
          {annotations.map((annotation) => (
            <LinearAnnotation
              key={`annotation-${annotation.start}-${annotation.end}`}
              annotation={annotation}
              sequence={sequence}
              stackIdx={stackIdx}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
const LinearAnnotation = ({
  annotation,
  sequence,
  stackIdx,
}: {
  annotation: Annotation;
  sequence: AnnotatedSequence;
  stackIdx: number;
}) => {
  /* if the annotation spans the seam, we draw two lines from the beginning to end, and from start to end */
  const annotationSpansSeam = annotation.end < annotation.start;
  if (annotationSpansSeam) {
    return (
      <Fragment>
        <LinearAnnotation
          annotation={{ ...annotation, end: sequence.length }}
          sequence={sequence}
          stackIdx={stackIdx}
        />
        <LinearAnnotation
          annotation={{ ...annotation, start: 0 }}
          sequence={sequence}
          stackIdx={stackIdx}
        />
      </Fragment>
    );
  }
  const annotationRectangleWidthPerc =
    ((annotation.end - annotation.start) / sequence.length) * 100;

  const xPerc = (annotation.start / sequence.length) * 100;

  return (
    <div
      className={classNames("truncate pl-1", annotation.className)}
      style={{
        marginLeft: `${xPerc}%`,
        width: `${annotationRectangleWidthPerc}%`,
      }}
    >
      {annotation.text}
    </div>
  );
};
