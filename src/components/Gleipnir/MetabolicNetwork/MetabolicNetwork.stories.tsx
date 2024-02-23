import { Card } from "@ui/Card";
import { useState } from "react";
import { GENES, REACTIONS } from "../storyUtils";
import { Gene } from "../types";
import { MetabolicNetwork } from "./MetabolicNetwork";

export default {
  title: "Gleipnir/MetabolicNetwork",
  component: MetabolicNetwork,
  argTypes: {
    query: { type: "string" },
  },
};

export const MetabolicNetworkStory = () => {
  const [currentGene, setCurrentGene] = useState<Gene | null>(GENES[0]);
  return (
    <Card className="">
      <MetabolicNetwork
        genes={GENES}
        currentGene={currentGene}
        setCurrentGene={setCurrentGene}
        reactions={REACTIONS}
      />
    </Card>
  );
};
