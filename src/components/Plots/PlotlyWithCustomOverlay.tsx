import { useMousePosition } from "@hooks/useMousePosition";
import Plotly from "plotly.js-basic-dist-min";
import { useState } from "react";
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

export type HoverPoint = {
  data: Plotly.PlotDatum;
};

export const PlotlyWithCustomOverlay = ({
  children,
}: {
  children: (point: HoverPoint) => React.ReactNode;
}) => {
  const [hoverPoint, setHoverPoint] = useState<HoverPoint | null>(null);
  const { mousePosition } = useMousePosition();
  return (
    <>
      <Plot
        onHover={(hover: Plotly.PlotMouseEvent) => {
          setHoverPoint({
            data: hover.points[0],
          });
        }}
        onUnhover={() => {
          setHoverPoint(null);
        }}
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
            hoverinfo: "none",
          },
        ]}
        layout={{ title: "A Fancy Plot", paper_bgcolor: "" }}
        className="overflow-hidden rounded-xl shadow-lg"
      />
      {hoverPoint && mousePosition !== null && (
        <div
          style={{
            position: "absolute",
            left: mousePosition.x,
            top: mousePosition.y,
          }}
        >
          {children(hoverPoint)}
        </div>
      )}
    </>
  );
};
