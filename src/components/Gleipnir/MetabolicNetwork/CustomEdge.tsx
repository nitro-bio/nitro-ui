import { classNames } from "@utils/stringUtils";
import { getBezierPath, Position } from "reactflow";

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
  className,
}: {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition: Position;
  targetPosition: Position;
  className?: string;
  data?: { label: string };
  markerEnd?: string;
}) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const midpointOfEdge = {
    x: (sourceX + targetX) / 2,
    y: (sourceY + targetY) / 2,
  };

  return (
    <>
      <path
        id={`connecting-edge-${id}`}
        className={classNames("text-noir-200 dark:text-noir-50", className)}
        d={edgePath}
        markerEnd={markerEnd}
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      {data && (
        <>
          <text
            className={"text-noir-400 dark:text-noir-50"}
            fill="currentColor"
            x={midpointOfEdge.x + 50}
            y={midpointOfEdge.y}
            textAnchor="middle"
          >
            {data.label}
          </text>
        </>
      )}
    </>
  );
}
