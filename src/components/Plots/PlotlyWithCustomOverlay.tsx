import { useMousePosition } from "@hooks/useMousePosition";
import Plotly, {
  PlotHoverEvent,
  PlotMouseEvent,
} from "plotly.js-basic-dist-min";
import { useState } from "react";
import { PlotParams } from "react-plotly.js";
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

export type HoverPoint = {
  data: Plotly.PlotDatum;
};

export const PlotlyWithCustomOverlay = ({
  children,
  ...props
}: PlotParams & {
  children: (hoverEvent: PlotHoverEvent) => React.ReactNode;
}) => {
  const [hoverEvent, setHoverEvent] = useState<PlotHoverEvent | null>(null);
  const { mousePosition } = useMousePosition();
  return (
    <>
      <Plot
        {...props}
        onHover={(hover: PlotHoverEvent) => {
          setHoverEvent(hover);
          props.onHover?.(hover);
        }}
        onUnhover={(unhover: PlotMouseEvent) => {
          setHoverEvent(null);
          props.onUnhover?.(unhover);
        }}
      />
      {hoverEvent && mousePosition !== null && (
        <div
          style={{
            position: "absolute",
            left: mousePosition.x,
            top: mousePosition.y,
          }}
        >
          {children(hoverEvent)}
        </div>
      )}
    </>
  );
};
