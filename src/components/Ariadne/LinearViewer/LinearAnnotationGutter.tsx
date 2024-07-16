import { getSubsequenceLength } from "@Ariadne/utils";
import { classNames } from "@utils/stringUtils";
import { Fragment } from "react";
import { AnnotatedSequence, Annotation, StackedAnnotation } from "../types";

/*
I personally like to define the props interface outside of the component. I think its a bit more readable,
but thats personal preference. The other advantage is that for complicated interfaces you can export them
and use them as a type check in other files.

example:

interface iLinearAnnotationGutterProps {
  stackedAnnotations: StackedAnnotation[];
  sequence: AnnotatedSequence;
  containerClassName?: string;
}

export const LinearAnnotationGutter = (props: iLinearAnnotationGutterProps) => {
  ...

OR

export const LinearAnnotationGutter = ({
  stackedAnnotations,
  sequence,
  containerClassName,
}: iLinearAnnotationGutterProps) => {
  ...
*/
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
        containerClassName,
      )}
    >
      {stacks.map((annotations, stackIdx) => (
        // When there are multiple annotations in the same stack (or of the same type in the LinearViewer)
        // they seem to display on top of each other. This is probably less of a problem in real sequences
        // rather than the small random sequences generated in the storybook. Is there some way we can make
        // it so they display a bit more gracefully?
        <div key={`annotation-stack-${stackIdx}`} className="relative h-8">
          {annotations.map((annotation) => (
            <LinearAnnotation
              key={`annotation-${annotation.text}-${annotation.start}-${annotation.end}-${annotation.direction}`}
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

  const annotationSpansSeam =
    annotation.direction === "forward"
      ? annotation.start > annotation.end
      : annotation.end > annotation.start;
  if (annotationSpansSeam) {
    if (annotation.direction === "forward") {
      return (
        <Fragment>
          <LinearAnnotation
            annotation={{
              ...annotation,
              end: sequence.length,
              onClick: () => {
                annotation.onClick?.({ ...annotation });
              },
            }}
            sequence={sequence}
            stackIdx={stackIdx}
          />
          <LinearAnnotation
            annotation={{
              ...annotation,
              start: 0,
              onClick: () => {
                annotation.onClick?.({ ...annotation });
              },
            }}
            sequence={sequence}
            stackIdx={stackIdx}
          />
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <LinearAnnotation
            annotation={{
              ...annotation,
              start: sequence.length,
              onClick: () => {
                annotation.onClick?.({ ...annotation });
              },
            }}
            sequence={sequence}
            stackIdx={stackIdx}
          />
          <LinearAnnotation
            annotation={{
              ...annotation,
              end: 0,
              onClick: () => {
                annotation.onClick?.({ ...annotation });
              },
            }}
            sequence={sequence}
            stackIdx={stackIdx}
          />
        </Fragment>
      );
    }
  }

  const annotationRectangleWidthPerc =
    (getSubsequenceLength(annotation, sequence.length) / sequence.length) * 100;

  const xPerc =
    (Math.min(annotation.start, annotation.end) / sequence.length) * 100;
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
          "px-2",
          annotation.direction === "forward" ? "text-left" : "text-right",
          annotation.className,
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
          "absolute left-1/2 z-10 hidden -translate-x-1/2 translate-y-4 flex-col rounded-md px-2 py-1 text-sm group-hover:flex",
          annotation.className,
        )}
      >
        <span>{annotation.text}</span>
        <span>{annotation.type}</span>
      </div>
    </div>
  );
};
