import { findCoor } from "../circularUtils";

export const CircularIndex = ({
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
  if (sequence.length > 80) {
    return (
      <svg className={`text-brand-800 fill-current`}>
        <circle
          cx={cx}
          cy={cy}
          r={radius * 0.75}
          fill="none"
          stroke="inherit"
          strokeWidth={2}
        />
      </svg>
    );
  }
  return (
    <text className="text-brand-800">
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
