import { atom, useAtom } from "jotai";
import { RefObject, useEffect } from "react";
import { useTextSelection } from "../hooks/useTextSelection";
import { stackElements } from "./circularUtils";

export interface Props {
  sequence: string;
  size: number;
}
const sequenceAtom = atom("");

type SelectionRange = [null, null] | [number, number] | [number, null];
const selectionRangeAtom = atom<SelectionRange>([null, null]);
export const CircularViewer = (props: Props) => {
  const [sequence, setSequence] = useAtom(sequenceAtom);
  const { cx, cy, sizeX, sizeY, radius, strokeWidth } = {
    cx: props.size / 2,
    cy: props.size / 2,
    sizeX: props.size,
    sizeY: props.size,
    radius: (props.size - 10) / 2,
    strokeWidth: 2,
  };
  useEffect(
    function syncSequenceAtomWithProps() {
      setSequence(props.sequence);
    },
    [props.sequence]
  );

  const { range, ref: selectionRef } = useTextSelection();
  const [selectionRange, setSelectionRange] = useAtom(selectionRangeAtom);

  useEffect(
    function syncSelectionRangeAtomWithSelection() {
      const [rawStart, rawEnd] = [
        range?.startContainer?.parentElement?.getAttribute("data-seq-index"),
        range?.endContainer?.parentElement?.getAttribute("data-seq-index"),
      ];
      const [start, end] = [
        rawStart ? parseFloat(rawStart) : null,
        rawEnd ? parseFloat(rawEnd) : null,
      ];
      setSelectionRange([start, end] as SelectionRange);
    },
    [range]
  );

  console.table(selectionRange);
  const annotations: Annotation[] = [
    {
      start: 0,
      end: 4,
      color: "red",
      text: "test",
      onClick: () => console.log("clicked"),
    },
    {
      start: 3,
      end: 16,
      color: "green",
      text: "test",
      onClick: () => console.log("clicked"),
    },
    {
      start: 20,
      end: 24,
      color: "blue",
      text: "test",
      onClick: () => console.log("clicked"),
    },
  ];

  return (
    <div
      className="font-mono p-6 font-thin text-brand-400"
      ref={selectionRef as React.RefObject<HTMLDivElement>}
    >
      <div className="flex flex-row gap-2 text-brand-500 h-24">
        {selectionRange[0] !== null && (
          <div className="flex flex-col gap-1">
            <div>Start</div>
            <div>{selectionRange[0]}</div>
          </div>
        )}
        {selectionRange[1] !== null && (
          <div className="flex flex-col gap-1">
            <div>End</div>
            <div>{selectionRange[1]}</div>
          </div>
        )}
      </div>
      <svg
        viewBox={`0 0 ${sizeX} ${sizeY}`}
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="inherit"
        fontSize="inherit"
        fontWeight="inherit"
        className="stroke-current"
      >
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
        />
        <CircularSequenceIndex cx={cx} cy={cy} radius={radius} />
        <CircularAnnotationGutter
          annotations={annotations}
          cx={cx}
          cy={cy}
          radius={radius}
        />
      </svg>
    </div>
  );
};

interface Annotation {
  start: number;
  end: number;
  color: string;
  text: string;
  onClick: () => void;
}
const CircularAnnotation = ({
  annotation,
  gutterRadius,
  radius,
  center,
}: {
  gutterRadius: number;
  annotation: Annotation;
  radius: number;
  center: Coor;
}) => {
  const [sequence] = useAtom(sequenceAtom);
  const { x: cx, y: cy } = center;
  /* draw an svg path for an arc of quadrant 1 of a circl */
  const arcPath = genArc({
    arrowFWD: true,
    arrowREV: false,
    innerRadius: gutterRadius,
    outerRadius: gutterRadius + 5,
    largeArc: false,
    length: annotation.end - annotation.start,
    sweepFWD: true,
    lineHeight: 10,
    seqLength: sequence.length,
    radius,
    offset: annotation.start,
    center: { x: cx, y: cy },
  });

  return (
    <path d={arcPath} fill={annotation.color} stroke={annotation.color}>
      <text>Annotation</text>
    </path>
  );
};

const CircularAnnotationGutter = ({
  annotations,
  cx,
  cy,
  radius,
}: {
  annotations: Annotation[];
  cx: number;
  cy: number;
  radius: number;
}) => {
  const gutterRadius = radius * 0.4;
  const stackedAnnotations = stackElements(annotations);
  console.log(stackedAnnotations);
  return (
    <g className="text-brand-800">
      <circle cx={cx} cy={cy} r={gutterRadius} fill="none" strokeWidth={1} />;
      {stackedAnnotations.map((annotations, stackIdx) => (
        <>
          {annotations.map((annotation) => (
            <CircularAnnotation
              key={`${annotation.start}-${annotation.end}-${annotation.text}`}
              annotation={annotation}
              radius={radius}
              center={{ x: cx, y: cy }}
              gutterRadius={gutterRadius + stackIdx * 10}
            />
          ))}
        </>
      ))}
    </g>
  );
};
/**
 * Taken from seqviz
 * Given an inner and outer radius, and the length of the element, return the
 * path for an arc that circles the plasmid. The optional paramters sweepFWD and sweepREV
 * are needed for selection arcs (where the direction of the arc isn't known beforehand)
 * and arrowFWD and arrowREV are needed for annotations, where there may be directionality
 */
const genArc = ({
  innerRadius,
  largeArc,
  length,
  offset,
  seqLength,
  center,
  outerRadius,
  sweepFWD,
}: {
  arrowFWD: boolean;
  arrowREV: boolean;
  innerRadius: number;
  largeArc: boolean;
  length: number;
  outerRadius: number;
  sweepFWD: boolean;
  lineHeight: number;
  seqLength: number;
  radius: number;
  offset: number;
  center: Coor;
}): string => {
  // build up the six default coordinates
  const leftBottom = findCoor({
    index: offset,
    radius: innerRadius,

    center,
    seqLength,
  });
  const leftTop = findCoor({
    index: offset,
    radius: outerRadius,

    center,
    seqLength,
  });
  const rightBottom = findCoor({
    index: length + offset,
    radius: innerRadius,

    center,
    seqLength,
  });
  const rightTop = findCoor({
    index: length + offset,
    radius: outerRadius,

    center,
    seqLength,
  });

  const lArc = largeArc ? 1 : 0;
  const sFlagF = sweepFWD ? 1 : 0;
  const sFlagR = sweepFWD ? 0 : 1;

  return `M ${rightBottom.x} ${rightBottom.y}
      A ${innerRadius} ${innerRadius}, 0, ${lArc}, ${sFlagR}, ${leftBottom.x} ${leftBottom.y}
      L ${leftBottom.x} ${leftBottom.y}
      L ${leftTop.x} ${leftTop.y}
      A ${outerRadius} ${outerRadius}, 0, ${lArc}, ${sFlagF}, ${rightTop.x} ${rightTop.y}
      Z`;
};

interface Coor {
  x: number;
  y: number;
}
/**
 * Given a coordinate, and the degrees to rotate it, find the new coordinate
 * (assuming that the rotation is around the center)
 */
const rotateCoor = ({
  coor,
  degrees,
  center,
}: {
  coor: Coor;
  degrees: number;
  center: Coor;
}) => {
  // find coordinate's current angle
  const angle = degrees * (Math.PI / 180); // degrees to radians
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  // find the new coordinate
  const xDiff = coor.x - center.x;
  const yDiff = coor.y - center.y;
  const cosX = cos * xDiff;
  const cosY = cos * yDiff;
  const sinX = sin * xDiff;
  const sinY = sin * yDiff;
  const xAdjust = cosX - sinY;
  const yAdjust = sinX + cosY;

  return {
    x: center.x + xAdjust,
    y: center.y + yAdjust,
  };
};

const CircularSequenceIndex = ({
  cx,
  cy,
  radius,
}: {
  cx: number;
  cy: number;
  radius: number;
}) => {
  const [sequence] = useAtom(sequenceAtom);
  return (
    <text className="text-noir-800">
      {sequence.split("").map((letter, index) => {
        const { x, y } = findCoor({
          index,
          radius: radius * 0.7,
          center: { x: cx, y: cy },
          seqLength: sequence.length,
        });
        const rotateDegrees = (index / sequence.length) * 360;
        return (
          <tspan
            key={`base-${index}`}
            x={x}
            y={y}
            transform={`rotate(${rotateDegrees} ${x} ${y})`}
            textAnchor="middle"
            dominantBaseline="middle"
            color="currentColor"
            fill="currentColor"
            fontSize="0.5rem"
            fontWeight="thin"
            fontFamily="inherit"
            data-seq-index={index}
          >
            {letter}
          </tspan>
        );
      })}
    </text>
  );
};
/**
 * Given an index along the plasmid and its radius, find svg coordinate
 */
const findCoor = ({
  index,
  radius,
  center,
  seqLength,
}: {
  index: number;
  radius: number;

  center: Coor;
  seqLength: number;
}): Coor => {
  const lengthPerc = index / seqLength;
  const lengthPercCentered = lengthPerc - 0.25;
  const radians = lengthPercCentered * Math.PI * 2;
  const xAdjust = Math.cos(radians) * radius;
  const yAdjust = Math.sin(radians) * radius;

  return {
    x: center.x + xAdjust,
    y: center.y + yAdjust,
  };
};
