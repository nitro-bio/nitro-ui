import { classNames } from "@utils/stringUtils";
import React from "react";
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
  console.table({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data,
    markerEnd,
    className,
  });
  return (
    <>
      <path
        id={id}
        className={classNames("react-flow_edge-path", className)}
        d={getArrowPath({
          start: { x: sourceX - 30, y: sourceY },
          end: { x: targetX - 30, y: targetY },
        })}
        style={{ stroke: "red", fill: "transparent", strokeWidth: 2 }}
        markerEnd={markerEnd}
      />
      {data && (
        <text x={(sourceX + targetX) / 2 - 125} y={(sourceY + targetY) / 2}>
          {data.label}
        </text>
      )}
    </>
  );
}
function getArrowPath({
  start,
  end,
}: {
  start: { x: number; y: number };
  end: { x: number; y: number };
}) {
  /* using start and end, generate an svg path string for an arrow that arcs between the two points */
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dr = Math.sqrt(dx * dx + dy * dy);
  return `M${start.x},${start.y}A${dr},${dr} 0 0,1 ${end.x},${end.y}`;
}
