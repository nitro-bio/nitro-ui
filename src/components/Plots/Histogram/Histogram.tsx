import { useDebounce } from "@hooks/useDebounce";
import { classNames } from "@utils/stringUtils";
import { bin } from "d3";
import { useState } from "react";
// NITRO UI
type Point = {
  x: number;
  y: number;
  style?: string;
};
export interface HistogramProps {
  data: Point[];
  weightFunc?: (d: Point) => number;
  initialBins?: number;

  colClassName?: (b: Bin) => string;
  containerClassName?: string;
}
export const Histogram = ({
  data,
  initialBins,
  weightFunc,

  colClassName,
  containerClassName,
}: HistogramProps) => {
  const [bins] = useState(initialBins ?? 10);
  const debouncedBins = useDebounce<number>({ value: bins, delay: 500 });
  const binnedData = binData(data, debouncedBins);

  // by default we weight every point equally
  const internalWeightFunc = weightFunc ?? (() => 1);
  let maxWeight = 0;
  binnedData.forEach((bin) => {
    const weight = bin.values.reduce((acc, point) => {
      return acc + internalWeightFunc(point);
    }, 0);
    if (weight > maxWeight) {
      maxWeight = weight;
    }
  });

  return (
    <div className="flex flex-col">
      <div
        className={classNames(
          "grid h-full w-full auto-cols-fr grid-flow-col-dense grid-rows-1 items-end px-8 pt-16",
          containerClassName
        )}
      >
        {binnedData.map((bd, i) => (
          <BinColumn
            key={`bin-${i}`}
            bin={bd}
            maxWeight={maxWeight}
            weightFunc={internalWeightFunc}
            colClassName={colClassName}
          />
        ))}
      </div>
    </div>
  );
};

const BinColumn = ({
  bin,
  maxWeight,
  weightFunc,
  colClassName,
}: {
  bin: Bin;
  maxWeight: number;
  weightFunc: (d: Point) => number;
  colClassName?: (b: Bin) => string;
}) => {
  const { values } = bin;
  const valuesWeight = values.reduce((acc, d) => acc + weightFunc(d), 0);
  const heightPct = Math.ceil((valuesWeight / maxWeight) * 100);
  return (
    <div
      className={classNames("min-w-[1px] ", colClassName && colClassName(bin))}
      title={`binIdx: ${bin.binIdx} binMin: ${bin.binMin}, binMax: ${bin.binMax}, weight: ${valuesWeight} count: ${values.length}`}
      style={{
        height: `${heightPct}%`,
      }}
    />
  );
};

interface Bin {
  binIdx: number;
  binMin: number;
  binMax: number;
  values: Point[];
}
const binData = (data: Point[], bins: number): Bin[] => {
  const sorted = data.sort((a, b) => a.x - b.x);
  const binned = bin<Point, number>()
    .domain([sorted[0].x, sorted[sorted.length - 1].x])
    .thresholds(bins)
    .value((d) => d.x)(data);
  return binned.map((bin, binIdx) => {
    const { x0: binMin, x1: binMax } = bin;
    if (binMin === undefined || binMax === undefined) {
      throw new Error("binMin or binMax is undefined");
    }
    const res = {
      binIdx,
      binMin,
      binMax,
      values: bin,
    };
    return res;
  });
};
