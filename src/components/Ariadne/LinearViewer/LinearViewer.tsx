import { stackElements } from "@Ariadne/utils";
import { classNames } from "@utils/stringUtils";
import { Fragment, useState } from "react";
import { AnnotatedSequence, Annotation } from "../types";

export interface Props {
  sequence: AnnotatedSequence;
  annotations: Annotation[];
}

const SVG_SIZE = 800;

export const LinearViewer = (props: Props) => {
  const { sequence, annotations } = props;

  const numberOfTicks = 5;
  const basesPerTick = Math.floor(sequence.length / numberOfTicks);

  return (
    <div className="font-mono relative p-6 font-thin text-brand-400">
      <svg
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
        <text
          x={"50%"}
          y={"80%"}
          textAnchor="middle"
          fill="currentColor"
          stroke="currentColor"
          alignmentBaseline="middle"
          fontSize={"1.8rem"}
        >
          {sequence.length} bases
        </text>
      </svg>
    </div>
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
          {annotations.map((annotation) => {
            const [isHovering, setIsHovering] = useState(false);
            const handleMouseOver = () => {
              setIsHovering(true);
            };

            const handleMouseOut = () => {
              setIsHovering(false);
            };

            return (
              <g
                key={`annotation-${annotation.color}-${annotation.start}-${annotation.end}`}
                className={classNames(annotation.color)}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <line
                  x1={`${(annotation.start / sequence.length) * 100}%`}
                  y1={`${50 + 3 * (stackIdx + 1)}%`}
                  x2={`${(annotation.end / sequence.length) * 100}%`}
                  y2={`${50 + 3 * (stackIdx + 1)}%`}
                  stroke="currentColor"
                  strokeWidth={10}
                />

                {isHovering && (
                  <g>
                    <rect
                      width="125"
                      height="50"
                      style={{ fill: "rgb(255,255,255)", position: "absolute" }}
                      x={`${(annotation.start / sequence.length) * 100}%`}
                      y={`${50 + 4 * (stackIdx + 1)}%`}
                    />
                    <line
                      id={`tick-${stackIdx + 1}`}
                      x1={`${(annotation.start / sequence.length) * 100}%`}
                      y1={`${50 + 3 * (stackIdx + 1)}%`}
                      x2={`${(annotation.start / sequence.length) * 100}%`}
                      y2={`${50 + 5 * (stackIdx + 1)}%`}
                      stroke="currentColor"
                      strokeWidth={1}
                    />
                    <text
                      x={`${(annotation.start / sequence.length) * 100 + 5}%`}
                      y={`${50 + 5 * (stackIdx + 1)}%`}
                      textAnchor="middle"
                      fill="black"
                      stroke="black"
                      alignmentBaseline="middle"
                      fontSize={"0.7rem"}
                    >
                      test annotation
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </Fragment>
      ))}
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
