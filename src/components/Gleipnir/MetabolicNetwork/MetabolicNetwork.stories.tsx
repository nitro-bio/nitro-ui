import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";
import { useState } from "react";
import { Gene, GENES } from "../types";
import MetabolicNetwork from "./MetabolicNetwork";

export default {
  title: "Gleipnir/MetabolicNetwork",
  component: MetabolicNetwork,
  argTypes: {
    query: { type: "string" },
  },
} as ComponentMeta<typeof MetabolicNetwork>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = (args: { query: string }) => {
  const [currentGene, setCurrentGene] = useState<Gene | null>(null);
  return (
    <Card className="">
      <MetabolicNetwork />
    </Card>
  );
};

export const MetabolicNetworkStory = Template.bind({});
MetabolicNetworkStory.args = {
  query:
    "ATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATGATG",
};
