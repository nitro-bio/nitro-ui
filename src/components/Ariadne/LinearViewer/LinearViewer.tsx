import { useLinearSelectionRect } from "@Ariadne/hooks/useSelection";
import { stackElements } from "@Ariadne/utils";
import { classNames } from "@utils/stringUtils";
import { Fragment, useEffect, useRef } from "react";
import { AnnotatedSequence, Annotation, AriadneSelection } from "../types";

export interface Props {
  sequence: AnnotatedSequence;
  annotations: Annotation[];
  selection: AriadneSelection | null;
  setSelection: (selection: AriadneSelection) => void;
}

const SVG_SIZE = 500;

export const LinearViewer = (props: Props) => {
  const { sequence, annotations, selection, setSelection } = props;

  const selectionRef = useRef<SVGSVGElement>(null);

  const numberOfTicks = 5;
  const basesPerTick = Math.floor(sequence.length / numberOfTicks);

  return (
    <div className="font-mono grid h-full  w-full select-none content-center overflow-hidden p-6 font-thin text-brand-400">
      <svg
        ref={selectionRef}
        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        xmlns="http://www.w3.org/2000/svg"
        className="w-full stroke-current"
      >
        <line
          x1="0"
          y1="20%"
          x2="100%"
          y2="20%"
          stroke="currentColor"
          strokeWidth={10}
        />
        <Ticks
          basesPerTick={basesPerTick}
          numberOfTicks={numberOfTicks}
          totalBases={sequence.length}
        />
        <LinearAnnotationGutter annotations={annotations} sequence={sequence} />
        <LinearSelection
          selectionRef={selectionRef}
          selection={selection}
          setSelection={setSelection}
          sequence={sequence}
        />
      </svg>
    </div>
  );
};

const LinearSelection = ({
  selection,
  selectionRef,
  setSelection,
  sequence,
}: {
  selectionRef: React.RefObject<SVGSVGElement>;
  setSelection: (selection: AriadneSelection) => void;
  selection: AriadneSelection | null;
  sequence: AnnotatedSequence;
}) => {
  const {
    start: internalSelectionStart,
    end: internalSelectionEnd,
    direction: internalDirection,
  } = useLinearSelectionRect(selectionRef);
  useEffect(
    function propagateSelectionUp() {
      if (
        selectionRef.current &&
        internalSelectionStart &&
        internalSelectionEnd
      ) {
        const svgWidth = selectionRef.current?.getBoundingClientRect().width;
        const start = Math.floor(
          (internalSelectionStart.x / svgWidth) * sequence.length
        );
        const end = Math.floor(
          (internalSelectionEnd.x / svgWidth) * sequence.length
        );
        setSelection({ start, end, direction: internalDirection });
      }
    },
    [internalSelectionStart, internalSelectionEnd]
  );

  if (!selection) {
    return null;
  }

  /* Display selection data that has trickled down */
  const { start, end, direction } = selection;
  if (start === null || end === null) {
    return null;
  }

  /* TODO: need to check if we cross the seam in a parent */
  /* if direction is backward and end > start we need to render two rectangles */

  if (direction === "forward" && start > end) {
    const firstRectWidth = (end / sequence.length) * 100;
    const secondRectStart = (start / sequence.length) * 100;
    const secondRectWidth = ((sequence.length - start) / sequence.length) * 100;
    return (
      <>
        <rect
          x={`${secondRectStart}%`}
          width={`${secondRectWidth}%`}
          y="16%"
          height="8%"
          fill="currentColor"
          fillOpacity={0.2}
        />
        <rect
          x={0}
          width={`${firstRectWidth}%`}
          y="16%"
          height="8%"
          fill="currentColor"
          fillOpacity={0.2}
        />
      </>
    );
  }
  if (direction === "reverse" && end > start) {
    const firstRectWidth = (start / sequence.length) * 100;
    const secondRectStart = (end / sequence.length) * 100;
    const secondRectWidth = ((sequence.length - end) / sequence.length) * 100;
    return (
      <>
        <rect
          x={`${secondRectStart}%`}
          width={`${secondRectWidth}%`}
          y="16%"
          height="8%"
          fill="currentColor"
          fillOpacity={0.2}
        />
        <rect
          x={0}
          width={`${firstRectWidth}%`}
          y="16%"
          height="8%"
          fill="currentColor"
          fillOpacity={0.2}
        />
      </>
    );
  }

  const leftEdge = Math.min(start, end);
  const left = (leftEdge / sequence.length) * 100;
  const width = (Math.abs(end - start) / sequence.length) * 100;
  return (
    <rect
      x={`${left}%`}
      y="16%"
      width={`${width}%`}
      height="8%"
      fill="currentColor"
      fillOpacity={0.2}
    />
  );
};

const LinearAnnotationGutter = ({
  annotations,
  sequence,
}: {
  annotations: Annotation[];
  sequence: AnnotatedSequence;
}) => {
  const stackedAnnotations = stackElements(annotations);
  return (
    <g>
      <line x1="0" y1="20%" x2="100%" y2="20%" stroke="currentColor" />
      {stackedAnnotations.map((annotations, stackIdx) => (
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
    </g>
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

  return (
    <g
      key={`annotation-${annotation.color}-${annotation.start}-${annotation.end}`}
      className={classNames(
        annotation.color,
        "opacity-40 transition-opacity duration-200 ease-in-out hover:opacity-100"
      )}
    >
      <title>{`${annotation.text} | pos: ${annotation.start} : ${annotation.end} | ${annotation.type}`}</title>
      <rect
        x={`${(annotation.start / sequence.length) * 100}%`}
        y={`${20 + 10 * (stackIdx + 1)}%`}
        width={`${annotationRectangleWidth}%`}
        height={10}
        fill="currentColor"
      ></rect>
      <text
        x={`${(annotation.start / sequence.length) * 100}%`}
        y={`${19 + 10 * (stackIdx + 1)}%`}
        fontFamily="Verdana"
        fontSize="15"
        fill="currentColor"
      >
        {annotation.text}
      </text>
    </g>
  );
};

const Ticks = ({
  basesPerTick,
  totalBases,
  numberOfTicks,
}: {
  basesPerTick: number;
  totalBases: number;
  numberOfTicks: number;
}) => {
  return (
    <svg>
      {[...Array(numberOfTicks).keys()].map((i) => {
        const { x1, x2 } = {
          x1: ((i * basesPerTick) / totalBases) * SVG_SIZE,
          x2: ((i * basesPerTick) / totalBases) * SVG_SIZE,
        };
        const { y1, y2 } = { y1: "20%", y2: "15%" };
        return (
          <g key={`tick-${i}`} className="fill-current text-brand-400/50">
            <line
              id={`tick-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth={1}
            />
            <text
              x={x2}
              y={y2}
              textAnchor="start"
              fontSize=".8rem"
              fill="currentColor"
            >
              {i * basesPerTick}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
