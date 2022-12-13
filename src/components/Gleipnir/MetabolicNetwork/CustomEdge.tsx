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
  const isCurrent = undefined;
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
/* function getArrowPath({
 *   start,
 *   end,
 * }: {
 *   start: { x: number; y: number };
 *   end: { x: number; y: number };
 * }) {
 *   const dx = end.x - start.x;
 *   const dy = end.y - start.y;
 *   const dr = Math.sqrt(dx * dx + dy * dy);
 *   return `M ${start.x} ${start.y} A ${dr} ${dr} 0 0 1 ${end.x} ${end.y}`;
 * } */
/* <path
 *   id={`product-arrow-${id}`}
 *   className={classNames("react-flow_edge-path", className)}
 *   d={getArrowPath({
 *     start: { x: midpointOfEdge.x - 30, y: midpointOfEdge.y - 30 },
 *     end: { x: midpointOfEdge.x - 30, y: midpointOfEdge.y + 30 },
 *   })}
 *   style={{ stroke: "red", fill: "transparent", strokeWidth: 2 }}
 *   markerEnd={markerEnd}
 *   transform={`translate(0, 0) rotate(${Math.atan2(
 *     targetY - sourceY,
 *     targetX - sourceX
 *   )})`}
 * /> */
