export interface Props {
  sequence: string;
}

export const CircularViewer = ({ sequence }: Props) => {
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
        <CircularSequenceIndex
          sequence={sequence}
          cx={cx}
          cy={cy}
          radius={radius}
        />
        <CircularAnnotationGutter
          sequence={sequence}
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
const CircularAnnotationGutter = ({
  sequence,
  annotations,
  cx,
  cy,
  radius,
}: {
  sequence: string;
  annotations: Annotation[];
  cx: number;
  cy: number;
  radius: number;
}) => {
  const gutterRadius = radius * 0.4;
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
    <g className="text-brand-800">
      <circle cx={cx} cy={cy} r={gutterRadius} fill="none" strokeWidth={2} />
      <path d={arcPath} />;
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
    rotate: true,
    center,
    seqLength,
  });
  let leftTop = findCoor({
    index: offset,
    radius: outerRadius,
    rotate: true,
    center,
    seqLength,
  });
  let rightBottom = findCoor({
    index: length + offset,
    radius: innerRadius,
    rotate: true,
    center,
    seqLength,
  });
  let rightTop = findCoor({
    index: length + offset,
    radius: outerRadius,
    rotate: true,
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
        rotate: true,
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
        rotate: true,
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
 *
 * in general this is for text and arcs
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
  sequence,
  cx,
  cy,
  radius,
}: {
  sequence: string;
  cx: number;
  cy: number;
  radius: number;
}) => {
  return (
    <g className="text-noir-800">
      {sequence.split("").map((letter, index) => {
        const { x, y } = getCircularCoordinateByIndex({
          totalBases: sequence.length,
          index,
          cx: cx - 1,
          cy,
          radius: radius * 0.75,
        });
        console.log({ x, y });
        return (
          <g key={`base-${index}`} transform={`translate(${x},${y})`}>
            <text
              textAnchor="middle"
              transform={`rotate(${getCircularRotationByIndex({
                totalBases: sequence.length,
                index,
              })})`}
              dominantBaseline="middle"
              color="currentColor"
              fill="currentColor"
              fontSize="1rem"
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
 * Given an index along the plasmid and its radius, find the coordinate
 * will be used in many of the child components
 *
 * In general, this is for lines and labels
 */
const findCoor = ({
  index,
  radius,
  rotate,
  center,
  seqLength,
}: {
  index: number;
  radius: number;
  rotate: boolean;
  center: Coor;
  seqLength: number;
}): Coor => {
  const context = { circular: 1 };
  const rotatedIndex = rotate ? index - context.circular : index;
  const lengthPerc = rotatedIndex / seqLength;
  const lengthPercCentered = lengthPerc - 0.25;
  const radians = lengthPercCentered * Math.PI * 2;
  const xAdjust = Math.cos(radians) * radius;
  const yAdjust = Math.sin(radians) * radius;

  return {
    x: center.x + xAdjust,
    y: center.y + yAdjust,
  };
};
const getCircularRotationByIndex = ({
  totalBases,
  index,
}: {
  totalBases: number;
  index: number;
}) => {
  const angle = (360 / totalBases) * index;
  return angle + 90;
};

const getCircularCoordinateByIndex = ({
  index,
  totalBases,
  cx,
  cy,
  radius,
}: {
  index: number;
  totalBases: number;
  cx: number;
  cy: number;
  radius: number;
}) => {
  const angle = (index / totalBases) * 2 * Math.PI;
  const x = cx + radius * Math.cos(angle);
  const y = cy + radius * Math.sin(angle);
  return { x, y };
};
