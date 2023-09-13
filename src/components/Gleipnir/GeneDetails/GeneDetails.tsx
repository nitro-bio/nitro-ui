import { Card } from "@ui/Card";
import { Combobox } from "@ui/Combobox";
import { Molstar } from "../Molstar";
import { Gene, Protein } from "../types";

export const GeneDetails = ({
  currentGene,
  setCurrentGene,
  genes,
  proteins,
}: {
  currentGene: Gene | null;
  genes: Gene[];
  setCurrentGene: (gene: Gene | null) => void;
  proteins: Protein[];
}) => {
  const pdbForGene = proteins.find(
    (protein) => protein.id === currentGene?.id
  )?.pdb;
  const currentGeneIdx = genes.findIndex((gene) => gene.id === currentGene?.id);

  return (
    <Card>
      <div className="border-3 flex w-full flex-col items-start justify-start gap-2 border-b pb-4">
        <h1 className="text-baseline text-lg text-noir-400">Gene </h1>
        <Combobox
          options={genes}
          onSelect={(option) => {
            const gene = genes.find((gene) => gene.id === option.id) ?? null;
            setCurrentGene(gene);
          }}
          selectedOptionIdx={currentGeneIdx}
        />
      </div>
      <div className="flex w-full w-full items-center justify-center">
        <div className="flex h-[200px] w-[200px] items-center justify-center md:h-[400px] md:w-[400px]">
          {pdbForGene ? (
            <Molstar pdbId={pdbForGene} />
          ) : (
            <p className="text-xl font-semibold text-noir-300 dark:text-noir-600">
              No PDB to display
            </p>
          )}
        </div>
      </div>
      <p className="text-start font-serif text-noir-600 dark:text-noir-100">
        {currentGene?.description || "No description to show"}
      </p>
    </Card>
  );
};
