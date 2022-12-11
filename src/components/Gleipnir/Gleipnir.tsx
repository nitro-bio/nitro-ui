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
    <div className="grid grid-cols-1 content-between md:grid-cols-3 ">
      <div className="grid content-start p-8 md:col-span-1">
        <Combobox
          options={GENES}
          onSelect={setCurrentGene}
          selectedOptionIdx={currentGeneIdx}
        />
      </div>
      <GeneDetails />
      <div className="row-span-2 grid content-center md:col-span-2">
        <MetabolicNetwork />
      </div>
    </div>
  );
};
