import Combobox from "@ui/Combobox";
import { useState } from "react";
import { MetabolicNetwork } from "./MetabolicNetwork";
import { Gene, GENES } from "./types";

export const Gleipnir = () => {
  const [currentGene, setCurrentGene] = useState<Gene | null>(null);
  return (
    <div className="grid grid-cols-3 content-between ">
      <div className="col-span-1 grid content-start bg-green-300 p-8">
        <Combobox options={GENES} onSelect={setCurrentGene} />
      </div>
      <div className="col-span-2 grid content-center bg-red-300">
        <MetabolicNetwork genes={GENES} currentGene={currentGene} />
      </div>
    </div>
  );
};
