import { classNames } from "../..";
import { PlotlyWithCustomOverlay } from "./PlotlyWithCustomOverlay";

export default {
  title: "Plots/CustomPlotlyOverlay",
  argTypes: {},
};

export const Default = () => {
  return (
    <PlotlyWithCustomOverlay>
      {(point) => {
        console.log(point);
        return (
          <div
            className={classNames(
              "absolute h-40 w-40 rounded-lg bg-white p-2 text-black shadow-lg",
            )}
          >
            Hello
            {point.data.x?.toString()}
          </div>
        );
      }}
    </PlotlyWithCustomOverlay>
  );
};
