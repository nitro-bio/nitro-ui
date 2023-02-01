import { useState } from "react";
import Card from "@ui/Card";
import { bin } from "d3";

type Point = {
  x: number;
  y: number;
  style?: string;
};
export interface HistogramProps {
  data: Point[];
  weightFunc?: (d: Point) => number;
  initialBins?: number;
}
export const Histogram = ({
  data,
  initialBins,
  weightFunc,
}: HistogramProps) => {
  const [bins, setBins] = useState(initialBins ?? 10);
  const binnedData = binData(data, bins);

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
      <div className="grid h-[400px] w-full auto-cols-fr grid-flow-col-dense grid-rows-1 items-end gap-2  px-8 pt-16">
        {binnedData.map((bd, i) => (
          <BinColumn
            key={`bin-${i}`}
            bin={bd}
            maxWeight={maxWeight}
            weightFunc={internalWeightFunc}
          />
        ))}
      </div>
      <label
        htmlFor="bins"
        className="flex items-center gap-4 px-2 py-10 text-noir-700 dark:text-noir-200"
      >
        Bins:
        <input
          type="range"
          min={10}
          max={100}
          value={bins}
          onChange={(e) => {
            setBins(Number(e.target.value));
          }}
        />
      </label>
    </div>
  );
};

const BinColumn = ({
  bin,
  maxWeight,
  weightFunc,
}: {
  bin: Bin;
  maxWeight: number;
  weightFunc: (d: Point) => number;
}) => {
  const { values } = bin;
  const valuesWeight = values.reduce((acc, d) => acc + weightFunc(d), 0);
  const heightPct = Math.ceil((valuesWeight / maxWeight) * 100);
  console.table({ heightPct, valuesWeight, maxWeight });
  return (
    <div
      className="bg-brand-500"
      title={`binMin: ${bin.binMin}, binMax: ${bin.binMax}, weight: ${valuesWeight} count: ${values.length}`}
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
  return binned.map((bin, binIdx) => ({
    binIdx,
    binMin: bin.x0 as number,
    binMax: bin.x1 as number,
    values: bin,
  }));
};
