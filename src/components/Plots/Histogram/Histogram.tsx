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
export interface HistogramProps {
  data: Point[];
  weightFunc?: (d: Point) => number;
  initialBins?: number;
  maxBins?: number;
  colClassName?: string;
}
export const Histogram = ({
  data,
  initialBins,
  weightFunc,
  maxBins,
  colClassName,
}: HistogramProps) => {
  const [bins, setBins] = useState(initialBins ?? 10);
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
      <div className="grid h-[400px] w-full auto-cols-fr grid-flow-col-dense grid-rows-1 items-end px-8 pt-16">
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
      <HistogramInfo
        bins={bins}
        binnedData={binnedData}
        maxBins={maxBins}
        setBins={setBins}
      />
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
  colClassName?: string;
}) => {
  const { values } = bin;
  const valuesWeight = values.reduce((acc, d) => acc + weightFunc(d), 0);
  const heightPct = Math.ceil((valuesWeight / maxWeight) * 100);
  return (
    <div
      className={classNames("min-w-[1px] bg-brand-500", colClassName)}
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
    const sortedBin = bin.sort((a, b) => a.x - b.x);
    const res = {
      binIdx,
      binMin: sortedBin[0].x,
      binMax: sortedBin[sortedBin.length - 1].x,
      values: sortedBin,
    };
    return res;
  });
};

function HistogramInfo({
  bins,
  binnedData,
  maxBins,
  setBins,
}: {
  bins: number;
  binnedData: Bin[];
  maxBins: number | undefined;
  setBins: (bins: number) => void;
}) {
  return (
    <label
      htmlFor="bins"
      className="flex items-center gap-4 px-2 py-10 text-noir-700 dark:text-noir-700"
    >
      Bins Requested: {bins} Recieved: {binnedData.length}
      <input
        type="range"
        min={2}
        max={maxBins ?? 100}
        value={bins}
        onChange={(e) => {
          const newBins = parseInt(e.target.value);
          console.table({ newBins });
          setBins(newBins);
        }}
      />
    </label>
  );
}
