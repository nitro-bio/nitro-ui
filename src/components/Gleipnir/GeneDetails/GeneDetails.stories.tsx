import { Card } from "@ui/Card";

import { useState } from "react";
import { GeneDetails } from ".";
import { GENES, PROTEINS } from "../storyUtils";
import { Gene } from "../types";

export default {
  title: "Gleipnir/GeneDetails",
  component: GeneDetails,
  argTypes: {
    query: { type: "string" },
  },
};

export const GeneDetailsStory = () => {
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
