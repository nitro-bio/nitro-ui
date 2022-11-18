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

  return (
    <div className="p-6 text-brand-400">
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="inherit"
        fontSize="inherit"
        fontWeight="inherit"
      >
        <Circle
          cx={cx}
          cy={cy}
          radius={radius}
          strokeWidth={strokeWidth}
          color={"currentColor"}
          id="circleId"
        >
          <text dy={"-5%"}>
            <textPath
              startOffset="2%"
              fontFamily="inherit"
              fontSize="10px"
              fontSizeAdjust="0.58"
              fontWeight="lighter"
              fill="currentColor"
              stroke="currentColor"
              href="#circleId"
              lengthAdjust="spacing"
              method="spacing"
              textLength={2 * Math.PI * radius}
            >
              {sequence}
            </textPath>
          </text>
        </Circle>
      </svg>
    </div>
  );
};

const Circle = ({
  id,
  cx,
  cy,
  radius,
  strokeWidth,
  color,
  children,
}: {
  id: string;
  cx: number;
  cy: number;
  radius: number;
  strokeWidth: number;
  color: string;
  children?: React.ReactNode;
}) => {
  const path = convertCircleToPath(cx, cy, radius);
  return (
    <>
      <path
        d={path}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        id={id}
      />
      {children}
    </>
  );
};

const convertCircleToPath = (cx: number, cy: number, radius: number) => {
  return `M ${cx} ${cy} m -${radius}, 0 a ${radius},${radius} 0 1,0 ${
    radius * 2
  },0 a ${radius},${radius} 0 1,0 -${radius * 2},0`;
};
