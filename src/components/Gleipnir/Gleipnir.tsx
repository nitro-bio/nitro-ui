import Combobox from "@ui/Combobox";
import { useState } from "react";
import { MetabolicNetwork } from "./MetabolicNetwork";
import { Gene, GENES } from "./types";

export const Gleipnir = () => {
  const [currentGene, setCurrentGene] = useState<Gene | null>(null);
  return (
    <div className="grid grid-cols-1 content-between md:grid-cols-3 ">
      <div className="grid content-start bg-green-300 p-8 md:col-span-1">
        <Combobox options={GENES} onSelect={setCurrentGene} />
      </div>
      <div className="grid content-center bg-red-300 md:col-span-2">
        <MetabolicNetwork />
      </div>
    </div>
  );
};
