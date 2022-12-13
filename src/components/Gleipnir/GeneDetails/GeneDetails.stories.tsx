import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";

import { useState } from "react";
import GeneDetails from ".";
import { GENES, PROTEINS } from "../storyUtils";
import { Gene } from "../types";

export default {
  title: "Gleipnir/GeneDetails",
  component: GeneDetails,
  argTypes: {
    query: { type: "string" },
  },
} as ComponentMeta<typeof GeneDetails>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = () => {
  const [currentGene, setCurrentGene] = useState<Gene | null>(GENES[0]);
  return (
    <Card className="max-w-3xl">
      <GeneDetails
        currentGene={currentGene}
        proteins={PROTEINS}
        genes={GENES}
        setCurrentGene={setCurrentGene}
      />
    </Card>
  );
};

export const GeneDetailsStory = Template.bind({});
