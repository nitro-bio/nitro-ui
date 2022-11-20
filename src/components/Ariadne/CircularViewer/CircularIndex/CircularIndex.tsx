import { AnnotatedSequence } from "@Ariadne/types";
import { Fragment } from "react";
import { findCoor } from "../circularUtils";

export const CircularIndex = ({
  sequence,
  cx,
  cy,
  radius,
}: {
  sequence: AnnotatedSequence;
  cx: number;
  cy: number;
  radius: number;
}) => {
  const basesPerTick = Math.floor(20 * Math.log10(sequence.length));

  if (sequence.length > 80) {
    return (
      <svg className={`bg-brand-800 fill-current text-brand-800`}>
        <circle
          cx={cx}
          cy={cy}
          r={radius * 0.75}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        />
        <Ticks
          cx={cx}
          cy={cy}
          radius={radius * 0.75}
          basesPerTick={basesPerTick}
          totalBases={sequence.length}
        />
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          fill="currentColor"
          stroke="currentColor"
          alignmentBaseline="middle"
          fontSize={"1rem"}
        >
          {sequence.length} bp
        </text>
      </svg>
    );
  }
  return (
    <text className="text-brand-800">
      {sequence.map(({ base: letter }, index) => {
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

const Ticks = ({
  radius,
  cx,
  cy,
  basesPerTick,
  totalBases,
}: {
  radius: number;
  cx: number;
  cy: number;
  basesPerTick: number;
  totalBases: number;
}) => {
  const numberOfTicks = Math.floor(totalBases / basesPerTick);
  return (
    <svg>
      {[...Array(numberOfTicks).keys()].map((i) => {
        const { x: x1, y: y1 } = findCoor({
          index: i,
          radius,
          center: { x: cx, y: cy },
          seqLength: totalBases,
        });
        const { x: x2, y: y2 } = findCoor({
          index: i,
          radius: radius * 1.1,
          center: { x: cx, y: cy },
          seqLength: totalBases,
        });
        const rotateDegrees = (i / numberOfTicks) * 360;
        return (
          <Fragment key={`tick-${i}`}>
            <line
              id={`tick-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth={1}
              transform={`rotate(${rotateDegrees} ${cx} ${cy})`}
            />
            <text
              x={x2}
              y={y2 - 4}
              textAnchor="middle"
              fontSize=".8rem"
              transform={`rotate(${rotateDegrees} ${cx} ${cy})`}
              fill="currentColor"
            >
              {i * basesPerTick}
            </text>
          </Fragment>
        );
      })}
    </svg>
  );
};
