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
      </svg>
    </div>
  );
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
    <g>
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
