import { useState } from "react";
import Card from "@ui/Card";
import { bin } from "d3";

type Point = {
  x: number;
  y: number;
};
export interface HistogramProps {
  data: Point[];
  initialBins?: number;
}
export const Histogram = ({ data, initialBins }: HistogramProps) => {
  const [bins, setBins] = useState(initialBins ?? 10);
  const binnedData = binData(data, bins);
  const maxCount = Math.max(...binnedData.map((d) => d.values.length));
  return (
    <div className="flex flex-col">
      <div className="grid h-[400px] w-full auto-cols-fr grid-flow-col-dense grid-rows-1 items-end gap-2  px-8 pt-16">
        {binnedData.map((bd, i) => (
          <div key={`bin-${i}`}>
            <BinColumn bin={bd} maxCount={maxCount} maxHeight={300} />
          </div>
        ))}
      </div>
      <label htmlFor="bins" className="flex items-center gap-4 px-2 py-10">
        Bins:
        <input
          type="range"
          min={10}
          max={100}
          value={bins}
          onChange={(e) => {
            console.log("called");
            setBins(Number(e.target.value));
          }}
        />
      </label>
    </div>
  );
};

const BinColumn = ({
  bin,
  maxCount,
  maxHeight,
}: {
  bin: Bin;
  maxCount: number;
  maxHeight: number;
}) => {
  const { values } = bin;
  return (
    <div
      className="bg-brand-500"
      style={{
        height: `${(values.length / maxCount) * maxHeight}px`,
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
