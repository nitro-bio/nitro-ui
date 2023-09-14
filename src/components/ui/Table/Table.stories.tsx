import { Table } from ".";

export default {
  title: "UIElements/Table",
  component: Table,
  argTypes: {
    fullWidth: { type: "boolean" },
  },
};

type BioData = {
  proteinName: string;
  accession: string;
  rnaSequence: string;
  dnaSequence: string;
  organism: string;
  expressionSystem: string;
  molecularWeight: number;
  secondaryStructure: string;
  bioActivity: string;
  halfLife: number;
  isoElectricPoint: number;
  meltingPoint: number;
  bindingSite: string;
  modification: string;
};

const generateBioData = (n: number): BioData[] => {
  const proteins = ["ProteinA", "ProteinB", "ProteinC"];
  const organisms = ["E. coli", "Human", "Mouse"];
  const expressionSystems = ["Mammalian", "Bacterial", "Yeast"];
  const secondaryStructures = ["Alpha helix", "Beta sheet", "Loop"];
  const bioActivities = ["Enzymatic", "Structural", "Receptor"];

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
    isoElectricPoint: parseFloat((4 + Math.random() * 6).toFixed(2)),
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
