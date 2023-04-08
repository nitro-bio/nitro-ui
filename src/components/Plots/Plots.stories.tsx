import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Card } from "@ui/Card";
import { Histogram, generateRandomHistogramData } from "./Histogram";
import { generateRandomVolcanoData } from "./Volcano/utils";
import { Volcano } from "./Volcano/Volcano";

export default {
  title: "Plots/Plots",
  argTypes: {},
} as ComponentMeta<any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = () => {
  const histoData = generateRandomHistogramData(1000);
  const volcanoData = generateRandomVolcanoData(1000);
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="content-fit grid bg-white dark:bg-noir-800">
        <Histogram
          data={histoData}
          colClassName={() =>
            "opacity-30 hover:opacity-100 transition-opacity duration-300 ease-in-out bg-brand-500"
          }
          containerClassName={"h-[400px]"}
        />
      </Card>
      <Card className="content-fit grid bg-white dark:bg-noir-800">
        <Volcano
          data={volcanoData}
          pointClassName={() =>
            "opacity-30 hover:opacity-100 transition-opacity duration-300 ease-in-out bg-brand-500 h-2 w-2 rounded-full hover:scale-[200%] transform origin-center"
          }
          containerClassName={""}
        />
      </Card>
    </div>
  );
};

export const KitchenSinkViewerStory = Template.bind({});
KitchenSinkViewerStory.args = {};
