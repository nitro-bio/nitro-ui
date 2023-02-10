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
        "block grid grid-cols-1 grid-rows-auto gap-1",
        containerClassName
      )}
    >
      {stacks.map((annotations, stackIdx) => (
        <div key={`annotation-stack-${stackIdx}`} className="relative h-8">
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
      className="absolute group"
      style={{
        marginLeft: `${xPerc}%`,
        width: `${annotationRectangleWidthPerc}%`,
      }}
      onClick={() => {
        annotation.onClick?.(annotation);
      }}
    >
      <div className={classNames("truncate pl-1", annotation.className)}>
        {annotation.text}
      </div>
      <div
        className={classNames(
          "px-2 py-1 text-sm rounded-md absolute left-1/2 -translate-x-1/2 translate-y-4 hidden group-hover:flex flex-col  z-10 opacity-100",
          annotation.className
        )}
      >
        <strong>Type: </strong>
        <span>{annotation.type}</span>
        <strong>Pos: </strong>
        <span>
          {annotation.start}-{annotation.end}
        </span>
      </div>
    </div>
  );
};
