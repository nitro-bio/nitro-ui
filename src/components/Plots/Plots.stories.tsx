import useKeys from "@hooks/useKeys";
import {
  PlotDatum,
  PlotHoverEvent,
  PlotMouseEvent,
} from "plotly.js-basic-dist-min";
import { useMemo, useState } from "react";
import { classNames } from "../..";
import { PlotlyWithCustomOverlay } from "./PlotlyWithCustomOverlay";

export default {
  title: "Plots/CustomPlotlyOverlay",
  argTypes: {},
};

const generateData = (n: number) => {
  const data = [];
  const colors = ["red", "blue", "green", "yellow", "purple"];
  for (let i = 0; i < n; i++) {
    data.push({
      x: [Math.random(), Math.random(), Math.random()],
      y: [Math.random(), Math.random(), Math.random()],
      type: "scatter" as const,
      mode: "lines+markers" as const,
      marker: { color: colors[i % colors.length] },
      hoverinfo: "none" as const,
      name: `Plot ${i}`,
    });
  }
  return data;
};

export const Default = () => {
  const data = useMemo(() => generateData(5), []);
  const [selectedData, setSelectedData] = useState<PlotDatum[] | null>(null);
  const { isKeyDown } = useKeys();
  return (
    <>
      {isKeyDown("Shift") && <div>Selecting...</div>}
      <PlotlyWithCustomOverlay
        data={{ ...data }}
        layout={{
          clickmode: "select",
          dragmode: "select",
        }}
        config={{
          displayModeBar: false,
          displaylogo: false,
          watermark: false,
        }}
        onClick={(click: PlotMouseEvent) => {
          if (isKeyDown("Shift")) {
            setSelectedData((prev) => {
              if (prev === null) {
                return click.points;
              }
              return [...prev, ...click.points];
            });
            return;
          } else {
            setSelectedData(click.points);
          }
        }}
        onDoubleClick={() => {
          setSelectedData(null);
        }}
      >
        {(hoverEvent: PlotHoverEvent) => {
          return (
            <div
              className={classNames(
                "absolute h-40 w-40 rounded-lg bg-white p-2 text-black shadow-lg",
              )}
            >
              Hello
              {hoverEvent.points.map((point) => (
                <div key={`hoveroverlay-${point.pointIndex}`}>
                  {point.data.name}: {point.y?.toString()}
                </div>
              ))}
            </div>
          );
        }}
      </PlotlyWithCustomOverlay>
      {selectedData && (
        <div className="border border-red-400 text-white">
          {selectedData.map((point) => (
            <div key={`selectedoverlay-${point.pointIndex}`}>
              {point.data.name}: {point.y?.toString()}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
