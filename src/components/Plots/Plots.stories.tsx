import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";

export default {
  title: "Plots/Plots",
  argTypes: {},
} as ComponentMeta<any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = () => {
  return (
    <Card className="grid-row-auto grid grid-cols-1 content-center gap-4 bg-white dark:bg-noir-800 lg:h-screen lg:grid-cols-2 lg:grid-rows-2 ">
      Hello World
    </Card>
  );
};

export const KitchenSinkViewerStory = Template.bind({});
KitchenSinkViewerStory.args = {};
