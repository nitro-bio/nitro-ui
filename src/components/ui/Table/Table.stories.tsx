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

export const Default = () => {
  const data = generateBioData(10000);
  const resultsPerPage = 100;
  return <Table data={data} resultsPerPage={resultsPerPage} />;
};
