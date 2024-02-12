import { classNames } from "@utils/stringUtils";

type Point = {
  x: number;
  y: number;
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
  const maxX = Math.max(...data.map((d) => d.x));
  const maxY = Math.max(...data.map((d) => d.y));
  return (
    <div className={classNames("relative", containerClassName)}>
      {data.map((d, i) => {
        return (
          <div
            key={i}
            className={classNames(
              "absolute",
              pointClassName
                ? pointClassName(d)
                : "h-2 w-2 rounded-full bg-brand-500",
            )}
            style={{
              left: `${(d.x / maxX) * 100}%`,
              bottom: `${(d.y / maxY) * 100}%`,
            }}
          />
        );
      })}
    </div>
  );
};
