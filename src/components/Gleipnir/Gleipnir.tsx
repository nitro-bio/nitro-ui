import { useState } from "react";
import { MetabolicNetwork } from "./MetabolicNetwork";
import { Gene, Protein, Reaction } from "./types";

import { GeneDetails } from "./GeneDetails";

export const Gleipnir = ({
  genes,
  proteins,
  reactions,
}: {
  genes: Gene[];
  proteins: Protein[];
  reactions: Reaction[];
}) => {
  const [currentGene, setCurrentGene] = useState<Gene | null>(genes[0]);
  return (
    <div className="grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-2">
      <div className="max-w-xl flex-1">
        <GeneDetails
          proteins={proteins}
          currentGene={currentGene}
          genes={genes}
          setCurrentGene={setCurrentGene}
        />
      </div>
      <div className="grid flex-1 content-start p-8">
        <MetabolicNetwork
          genes={genes}
          currentGene={currentGene}
          setCurrentGene={setCurrentGene}
          reactions={reactions}
        />
      </div>
    </div>
  );
};
