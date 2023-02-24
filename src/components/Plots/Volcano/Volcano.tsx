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
            "absolute h-2 w-2 rounded-full bg-brand-500",
            pointClassName && pointClassName(d)
          )}
          style={{ left: `${d.x}%`, bottom: `${d.y}%` }}
        />
      ))}
    </div>
  );
};
