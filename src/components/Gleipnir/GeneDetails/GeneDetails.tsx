import { useAtom } from "jotai";
import { currentGeneAtom } from "../Gleipnir";

export const GeneDetails = () => {
  const [currentGene] = useAtom(currentGeneAtom);
  return (
    <div className="grid content-start p-8 md:col-span-1 ">
      {currentGene ? (
        <div>
          <h2 className="text-2xl font-bold">{currentGene.label}</h2>
        </div>
      ) : (
        <p className="text-lg">Select a gene to see details</p>
      )}
    </div>
  );
};
