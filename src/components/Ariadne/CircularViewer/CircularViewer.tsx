import { atom, useAtom } from "jotai";
import { useEffect } from "react";

export interface Props {
  sequence: string;
}
const sequenceAtom = atom("");
export const CircularViewer = (props: Props) => {
  const [, setSequence] = useAtom(sequenceAtom);

  useEffect(
    function syncSequenceAtomWithProps() {
      setSequence(props.sequence);
    },
    [props.sequence]
  );
  const { cx, cy, radius, strokeWidth } = {
    cx: 50,
    cy: 50,
    radius: 40,
    strokeWidth: 1,
  };

  const annotations: Annotation[] = [
    {
      start: 0,
      end: 4,
      color: "red",
      text: "test",
      onClick: () => console.log("clicked"),
    },
  ];
  return (
    <div className="font-mono p-6 font-thin text-brand-400 ">
      <svg
        viewBox="0 0 100 100"
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
  gutterRadius,

  radius,
  center,
}: {
  gutterRadius: number;

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
    length: 3,
    sweepFWD: true,
    lineHeight: 10,
    seqLength: sequence.length,
    radius,
    offset: 0,
    center: { x: cx, y: cy },
  });

  return (
    <path d={arcPath} fill="currentColor">
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
  return (
    <g className="text-brand-800">
      <circle cx={cx} cy={cy} r={gutterRadius} fill="none" strokeWidth={1} />;
      <CircularAnnotation
        radius={radius}
        center={{ x: cx, y: cy }}
        gutterRadius={gutterRadius}
      />
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
const genArc = (args: {
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
  const {
    arrowFWD,
    arrowREV,
    innerRadius,
    largeArc,
    length,
    lineHeight,
    radius,
    seqLength,
    center,
    outerRadius,
    sweepFWD,
  } = args;
  const offset = args.offset === undefined ? 0 : args.offset;
  // build up the six default coordinates
  let leftBottom = findCoor({
    index: offset,
    radius: innerRadius,

    center,
    seqLength,
  });
  let leftTop = findCoor({
    index: offset,
    radius: outerRadius,

    center,
    seqLength,
  });
  let rightBottom = findCoor({
    index: length + offset,
    radius: innerRadius,

    center,
    seqLength,
  });
  let rightTop = findCoor({
    index: length + offset,
    radius: outerRadius,

    center,
    seqLength,
  });
  let leftArrow = "";
  let rightArrow = "";

  // create arrows by making a midpoint along edge and shifting corners inwards
  if (arrowREV || arrowFWD) {
    // one quarter of lineHeight in px is the shift inward for arrows
    const inwardShift = lineHeight / 4;
    // given the arc length (inwardShift) and the radius (from SeqViewer),
    // we can find the degrees to rotate the corners
    const centralAngle = inwardShift / radius;
    // Math.min here is to make sure the arrow it's larger than the element
    const centralAnglePerc = Math.min(centralAngle / 2, length / seqLength);
    const centralAngleDeg = centralAnglePerc * 360;

    if (arrowREV) {
      leftBottom = rotateCoor({
        coor: leftBottom,
        degrees: centralAngleDeg,
        center,
      });
      leftTop = rotateCoor({ coor: leftTop, degrees: centralAngleDeg, center });
      const lArrowC = findCoor({
        index: 0,
        radius: (innerRadius + outerRadius) / 2,

        center,
        seqLength,
      });
      leftArrow = `L ${lArrowC.x} ${lArrowC.y}`;
    } else {
      rightBottom = rotateCoor({
        coor: rightBottom,
        degrees: -centralAngleDeg,
        center,
      });
      rightTop = rotateCoor({
        coor: rightTop,
        degrees: -centralAngleDeg,
        center,
      });
      const rArrowC = findCoor({
        index: length,
        radius: (innerRadius + outerRadius) / 2,

        center,
        seqLength,
      });
      rightArrow = `L ${rArrowC.x} ${rArrowC.y}`;
    }
  }

  const lArc = largeArc ? 1 : 0;
  const sFlagF = sweepFWD ? 1 : 0;
  const sFlagR = sweepFWD ? 0 : 1;

  return `M ${rightBottom.x} ${rightBottom.y}
      A ${innerRadius} ${innerRadius}, 0, ${lArc}, ${sFlagR}, ${leftBottom.x} ${leftBottom.y}
      L ${leftBottom.x} ${leftBottom.y}
      ${leftArrow}
      L ${leftTop.x} ${leftTop.y}
      A ${outerRadius} ${outerRadius}, 0, ${lArc}, ${sFlagF}, ${rightTop.x} ${rightTop.y}
      ${rightArrow}
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
    <g className="text-noir-800">
      {sequence.split("").map((letter, index) => {
        const { x, y } = findCoor({
          index,
          radius: radius * 0.7,
          center: { x: cx, y: cy },
          seqLength: sequence.length,
        });
        const rotateDegrees = (index / sequence.length) * 360;
        return (
          <g key={`base-${index}`}>
            <text
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
            >
              {letter}
            </text>
          </g>
        );
      })}
    </g>
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
