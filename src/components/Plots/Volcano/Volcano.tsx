import { useState } from "react";
import Card from "@ui/Card";
import { bin } from "d3";
import { useDebounce } from "@hooks/useDebounce";
import { classNames } from "@utils/stringUtils";

type Point = {
  x: number;
  y: number;
  style?: string;
};
export interface VolcanoProps {
  data: Point[];
  pointClassName?: (b: Point) => string;
  containerClassName?: string;
}
export const Volcano = ({
  data,
  pointClassName,
  containerClassName,
}: VolcanoProps) => {
  return (
    <div className={classNames("relative", containerClassName)}>
      {data.map((d, i) => (
        <div
          key={i}
          className={classNames(
            "bg-brand-500 rounded-full h-2 w-2 absolute",
            pointClassName && pointClassName(d)
          )}
          style={{ left: `${d.x}%`, bottom: `${d.y}%` }}
        />
      ))}
    </div>
  );
};
