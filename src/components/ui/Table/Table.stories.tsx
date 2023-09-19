import { Table } from ".";

export default {
  title: "UIElements/Table",
  component: Table,
  argTypes: {
    fullWidth: { type: "boolean" },
  },
};

type BioData = {
  proteinName: string | null;
  accession: string | null;
  rnaSequence: string | null;
  dnaSequence: string | null;
  organism: string | null;
  expressionSystem: string | null;
  molecularWeight: number;
  secondaryStructure: string | null;
  bioActivity: string | null;
  halfLife: number;
  iso_electric_point: number;
  meltingPoint: number;
  bindingSite: string | null;
  modification: string | null;
};

const generateBioData = (n: number): BioData[] => {
  const proteins = ["ProteinA", "ProteinB", "ProteinC", null];
  const organisms = ["E. coli", "Human", "Mouse", null];
  const expressionSystems = ["Mammalian", "Bacterial", "Yeast", null];
  const secondaryStructures = ["Alpha helix", "Beta sheet", "Loop", null];
  const bioActivities = ["Enzymatic", "Structural", "Receptor", null];

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
    secondaryStructure: randomChoice(secondaryStructures),
    bioActivity: randomChoice(bioActivities),
    halfLife: parseFloat((1 + Math.random() * 48).toFixed(2)),
    iso_electric_point: parseFloat((4 + Math.random() * 6).toFixed(2)),
    meltingPoint: parseFloat((40 + Math.random() * 60).toFixed(2)),
    bindingSite: randomChoice(proteins),
    modification: randomChoice(["Methylated", "Phosphorylated", "Acetylated"]),
  }));
};

export const Default = () => {
  const data = generateBioData(10000);
  const resultsPerPage = 100;
  return <Table data={data} resultsPerPage={resultsPerPage} />;
};
