import { usePaginator } from "@hooks/usePaginator";
import { ComponentProps } from "react";
import { Paginator } from ".";

export default {
  title: "UIElements/Paginator",
  component: Paginator,
};

type BioData = {
  proteinName: string;
  accession: string;
  rnaSequence: string;
  dnaSequence: string;
  organism: string;
  expressionSystem: string;
  molecularWeight: number;
};

const generateBioData = (n: number): BioData[] => {
  const proteins = ["ProteinA", "ProteinB", "ProteinC"];
  const organisms = ["E. coli", "Human", "Mouse"];
  const expressionSystems = ["Mammalian", "Bacterial", "Yeast"];

  function randomChoice<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  const randomSequence = (length: number) => {
    const bases = ["A", "T", "C", "G"];
    return [...Array(length)].map(() => randomChoice(bases)).join("");
  };

  return Array.from({ length: n }).map(() => ({
    proteinName: randomChoice(proteins),
    accession: `ACC${Math.floor(1000 + Math.random() * 9000)}`,
    rnaSequence: randomSequence(30),
    dnaSequence: randomSequence(30),
    organism: randomChoice(organisms),
    expressionSystem: randomChoice(expressionSystems),
    molecularWeight: parseFloat((10 + Math.random() * 90).toFixed(2)),
  }));
};
export const Default = (args: ComponentProps<typeof Paginator>) => {
  const data = generateBioData(10000);
  const resultsPerPage = args.resultsPerPage || 100;
  const { currentPage, totalPages, nextPage, prevPage } = usePaginator({
    data,
    resultsPerPage,
  });

  return (
    <>
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        resultsPerPage={resultsPerPage}
        totalResults={data.length}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </>
  );
};
