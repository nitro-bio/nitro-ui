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
        "grid-rows-auto block grid grid-cols-1 gap-1",
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
  // clip path to create rectangle with a point at one end
  const forwardClipPath = "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)";
  const reverseClipPath = "polygon(0 50%, 10% 0, 100% 0, 100% 100%, 10% 100%)";
  return (
    <div
      className="group absolute"
      style={{
        marginLeft: `${xPerc}%`,
        width: `${annotationRectangleWidthPerc}%`,
      }}
      onClick={() => {
        annotation.onClick?.(annotation);
      }}
    >
      <div
        className={classNames(
          "truncate px-2",
          annotation.direction === "forward" ? "text-left" : "text-right",
          annotation.className
        )}
        style={{
          clipPath:
            annotation.direction === "forward"
              ? forwardClipPath
              : reverseClipPath,
        }}
      >
        {annotation.text}
      </div>
      <div
        className={classNames(
          "absolute left-1/2 z-10 hidden -translate-x-1/2 translate-y-4 flex-col rounded-md px-2 py-1 text-sm  opacity-100 group-hover:flex",
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
