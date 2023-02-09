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
    <svg
      viewBox={`0 0 100 100`}
      width="100%"
      height="100%"
      className={classNames("", containerClassName)}
    >
      {stacks.map((annotations, stackIdx) => (
        <Fragment key={`annotation-stack-${stackIdx}`}>
          {annotations.map((annotation) => (
            <LinearAnnotation
              key={`annotation-${annotation.start}-${annotation.end}`}
              annotation={annotation}
              sequence={sequence}
              stackIdx={stackIdx}
            />
          ))}
        </Fragment>
      ))}
    </svg>
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
  const annotationRectangleWidth =
    ((annotation.end - annotation.start) / sequence.length) * 100;

  const xPerc = (annotation.start / sequence.length) * 100;
  const xStartLoc = xPerc;
  const xEndLoc = xPerc + annotationRectangleWidth;
  const yPerc = 5 * (stackIdx + 1);
  const yLoc = yPerc;

  const points =
    annotation.direction === "forward"
      ? `${xEndLoc},${yLoc} ${xEndLoc},${yLoc + 3} ${xEndLoc + 1.5},${
          yLoc + 1.5
        }`
      : `${xStartLoc},${yLoc} ${xStartLoc},${yLoc + 3} ${xStartLoc - 1.5},${
          yLoc + 1.5
        }`;
  const cap = <polygon points={points} strokeLinejoin="round" />;

  return (
    <g
      key={`annotation-${annotation.start}-${annotation.end}`}
      className={classNames(annotation.className, "text-white")}
      onClick={(e) => {
        if ("onClick" in annotation) {
          e.stopPropagation();
          annotation.onClick(annotation);
        }
      }}
    >
      <title>{`${annotation.text} | pos: ${annotation.start} : ${annotation.end} | ${annotation.type}`}</title>
      {cap}

      <rect
        x={`${xPerc}%`}
        y={`${yPerc}%`}
        width={`${annotationRectangleWidth}%`}
        height={"3%"}
      ></rect>

      <foreignObject
        x={`${(annotation.start / sequence.length) * 100}%`}
        y={`${5 * (stackIdx + 1)}%`}
        width={`${annotationRectangleWidth}%`}
        height={"4%"}
      >
        <div
          className="truncate text-[2px] font-semibold"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {annotation.text}
        </div>
      </foreignObject>
    </g>
  );
};
