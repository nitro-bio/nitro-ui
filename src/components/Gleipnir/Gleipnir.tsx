import Combobox from "@ui/Combobox";
import { useState } from "react";
import MetabolicNetwork from "./MetabolicNetwork";
import { Gene, GENES } from "./types";

import { atom, useAtom } from "jotai";
import GeneDetails from "./GeneDetails";

export const currentGeneAtom = atom<Gene | null>(null);
export const Gleipnir = () => {
  const [currentGene, setCurrentGene] = useAtom(currentGeneAtom);
  const currentGeneIdx = GENES.findIndex((gene) => gene.id === currentGene?.id);
  return (
    <div className="grid grid-cols-1 content-between bg-noir-50 md:grid-cols-2">
      <div className="grid content-start bg-red-50 p-8">
        <Combobox
          options={GENES}
          onSelect={setCurrentGene}
          selectedOptionIdx={currentGeneIdx}
        />
      </div>
      <div className="row-span-2 grid content-center bg-blue-50">
        <MetabolicNetwork />
      </div>
      <div className="grid content-start bg-green-50 p-8">
        <GeneDetails />
      </div>
    </div>
  );
};
