import { ComponentProps } from "react";
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

  const randomChoice = (arr: any[]) =>
    arr[Math.floor(Math.random() * arr.length)];

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
const Template = (args: ComponentProps<typeof Table>) => <Table {...args} />;
export const TableStory = Template.bind({});
TableStory.args = {
  data: generateBioData(10000),
  resultsPerPage: 10,
};
