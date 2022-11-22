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

const SVG_SIZE = 800;

export const LinearViewer = (props: Props) => {
  const { sequence, annotations, selection, setSelection } = props;

  const selectionRef = useRef<SVGSVGElement>(null);

  const numberOfTicks = 5;
  const basesPerTick = Math.floor(sequence.length / numberOfTicks);

  return (
    <div className="font-mono select-none p-6 font-thin text-brand-400">
      <svg
        ref={selectionRef}
        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="inherit"
        fontSize="inherit"
        fontWeight="inherit"
        className="stroke-current"
        width={"100%"}
        height={"100%"}
      >
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="currentColor"
          strokeWidth={10}
        />
        <Ticks
          basesPerTick={basesPerTick}
          numberOfTicks={numberOfTicks}
          totalBases={sequence.length}
        />
        <LinearAnnotationGutter annotations={annotations} sequence={sequence} />
        {/* <text
          x={"50%"}
          dy={-10}
          textAnchor="middle"
          fill="currentColor"
          stroke="currentColor"
          alignmentBaseline="middle"
          fontSize={"1.8rem"}
        >
          {sequence.length} bases
        </text> */}
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
  console.table({ start, end, direction });
  if (direction === "forward" && start > end) {
    const firstRectWidth = (end / sequence.length) * 100;
    const secondRectStart = (start / sequence.length) * 100;
    const secondRectWidth = ((sequence.length - start) / sequence.length) * 100;
    return (
      <>
        <rect
          x={`${secondRectStart}%`}
          width={`${secondRectWidth}%`}
          y="40%"
          height="20%"
          fill="currentColor"
          fillOpacity={0.2}
        />
        <rect
          x={0}
          width={`${firstRectWidth}%`}
          y="40%"
          height="20%"
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
          y="40%"
          height="20%"
          fill="currentColor"
          fillOpacity={0.2}
        />
        <rect
          x={0}
          width={`${firstRectWidth}%`}
          y="40%"
          height="20%"
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
      y="40%"
      width={`${width}%`}
      height="20%"
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
      <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" />
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
  return (
    <g
      key={`annotation-${annotation.color}-${annotation.start}-${annotation.end}`}
      className={classNames(annotation.color)}
    >
      <line
        x1={`${(annotation.start / sequence.length) * 100}%`}
        y1={`${50 + 3 * (stackIdx + 1)}%`}
        x2={`${(annotation.end / sequence.length) * 100}%`}
        y2={`${50 + 3 * (stackIdx + 1)}%`}
        stroke="currentColor"
        strokeWidth={10}
      />
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
        const { y1, y2 } = { y1: "50%", y2: "45%" };
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
