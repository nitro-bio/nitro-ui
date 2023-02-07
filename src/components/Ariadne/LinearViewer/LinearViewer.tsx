import { useLinearSelectionRect } from "@Ariadne/hooks/useSelection";
import { classNames } from "@utils/stringUtils";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  AnnotatedSequence,
  Annotation,
  AriadneSelection,
  StackedAnnotation,
} from "../types";

export interface Props {
  sequence: AnnotatedSequence;
  annotations: StackedAnnotation[];
  selection: AriadneSelection | null;
  setSelection: (selection: AriadneSelection | null) => void;
  onDoubleClick?: () => void;
  selectionClassName?: (selection: AriadneSelection) => string;
  cursorClassName?: string;
}

const SVG_SIZE = 500;

export const LinearViewer = (props: Props) => {
  const {
    sequence,
    annotations,
    selection,
    setSelection,
    onDoubleClick,
    selectionClassName,
    cursorClassName,
  } = props;

  const selectionRef = useRef<SVGSVGElement>(null);

  const numberOfTicks = 5;
  const basesPerTick = Math.floor(sequence.length / numberOfTicks);

  return (
    <div
      className="font-mono grid h-full  w-full select-none content-center overflow-hidden p-6 font-thin text-brand-400"
      onDoubleClick={onDoubleClick}
    >
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
        <LinearAnnotationGutter
          stackedAnnotations={annotations}
          sequence={sequence}
        />
        <LinearSelection
          selectionClassName={selectionClassName}
          selectionRef={selectionRef}
          selection={selection}
          setSelection={setSelection}
          sequence={sequence}
        />
        <LinearCursor
          selection={selection}
          selectionRef={selectionRef}
          cursorClassName={cursorClassName}
        />
      </svg>
    </div>
  );
};
const LinearCursor = ({
  selection,
  selectionRef,
  cursorClassName,
}: {
  selection: AriadneSelection | null;
  selectionRef: React.RefObject<SVGSVGElement>;
  cursorClassName?: string;
}) => {
  const [xPerc, setXPerc] = useState(0);

  useEffect(
    function hideOnSelection() {
      const selectionActive = selection && selection.start !== selection.end;
      if (selectionActive) {
        setXPerc(-1);
      }
    },
    [selection]
  );

  useEffect(
    function mountMouseMoveListener() {
      const node = selectionRef.current;
      const onMouseMove = (e: MouseEvent) => {
        const selectionActive = selection && selection.start !== selection.end;
        if (selectionRef.current && !selectionActive) {
          const { clientX } = e;
          const { left, right } =
            selectionRef.current.getBoundingClientRect() || {
              left: 0,
              right: 0,
            };
          const xRelative = clientX - left;
          const nodeWidth = right - left;
          const xPerc = xRelative / nodeWidth;
          setXPerc(xPerc * 100);
        }
      };

      if (node) {
        node.addEventListener("mousemove", onMouseMove);
      }
      return () => {
        node?.removeEventListener("mousemove", onMouseMove);
      };
    },
    [selectionRef, selection]
  );

  return (
    <g className={classNames(cursorClassName || "text-noir-800")}>
      <line
        x1={`${xPerc}%`}
        y1="20%"
        x2={`${xPerc + 1}%`}
        y2="20%"
        stroke="currentColor"
        strokeWidth={10}
      />
    </g>
  );
};

const LinearSelection = ({
  selection,
  selectionRef,
  setSelection,
  sequence,
  selectionClassName,
}: {
  selectionRef: React.RefObject<SVGSVGElement>;
  setSelection: (selection: AriadneSelection) => void;
  selection: AriadneSelection | null;
  sequence: AnnotatedSequence;
  selectionClassName?: (selection: AriadneSelection) => string;
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

  // basic case
  let firstRectStart = (Math.min(start, end) / sequence.length) * 100;
  let firstRectWidth = (Math.abs(end - start) / sequence.length) * 100;
  let secondRectStart = null;
  let secondRectWidth = null;

  /* if direction is backward and end > start we need to render two rectangles */
  if (direction === "forward" && start > end) {
    firstRectStart = 0;
    firstRectWidth = (end / sequence.length) * 100;
    secondRectStart = (start / sequence.length) * 100;
    secondRectWidth = ((sequence.length - start) / sequence.length) * 100;
  }
  if (direction === "reverse" && end > start) {
    firstRectStart = 0;
    firstRectWidth = (start / sequence.length) * 100;
    secondRectStart = (end / sequence.length) * 100;
    secondRectWidth = ((sequence.length - end) / sequence.length) * 100;
  }

  return (
    <g
      className={classNames(
        "fill-current stroke-current",
        selectionClassName?.(selection)
      )}
    >
      <rect
        x={`${firstRectStart}%`}
        width={`${firstRectWidth}%`}
        y="16%"
        height="8%"
        fill="currentColor"
        fillOpacity={0.2}
      />

      <rect
        x={`${secondRectStart}%`}
        width={`${secondRectWidth}%`}
        y="16%"
        height="8%"
        fill="currentColor"
        fillOpacity={0.2}
      />
    </g>
  );
};

const LinearAnnotationGutter = ({
  stackedAnnotations,
  sequence,
}: {
  stackedAnnotations: StackedAnnotation[];
  sequence: AnnotatedSequence;
}) => {
  const stacks: StackedAnnotation[][] = [];
  stackedAnnotations.forEach((ann) => {
    stacks[ann.stack] = stacks[ann.stack] || [];
    stacks[ann.stack].push(ann);
  });

  return (
    <g>
      <line x1="0" y1="20%" x2="100%" y2="20%" stroke="currentColor" />
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
      key={`annotation-${annotation.start}-${annotation.end}`}
      className={classNames(
        annotation.className,
        "opacity-40 transition-opacity duration-200 ease-in-out hover:opacity-100"
      )}
      onClick={() => {
        if ("onClick" in annotation) {
          annotation.onClick(annotation);
        }
      }}
    >
      <title>{`${annotation.text} | pos: ${annotation.start} : ${annotation.end} | ${annotation.type}`}</title>
      <rect
        x={`${(annotation.start / sequence.length) * 100}%`}
        y={`${20 + 5 * (stackIdx + 1)}%`}
        width={`${annotationRectangleWidth}%`}
        height={15}
        stroke="currentColor"
        fill="transparent"
      ></rect>

      <foreignObject
        x={`${(annotation.start / sequence.length) * 100}%`}
        y={`${18.7 + 5 * (stackIdx + 1)}%`}
        width={`${annotationRectangleWidth}%`}
        height={20}
      >
        <span className="text-current-color pl-1 font-semibold text-xs">
          {annotation.text}
        </span>
      </foreignObject>
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
