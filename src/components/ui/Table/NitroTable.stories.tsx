export default {
  title: "UIElements/Table/Nitro Table",
};

import { Card } from "@ui/Card";
import { NitroTable } from "@ui/Table";

type BioData = {
  "Protein Name": string | null;
  Accession: string | null;
  "RNA Sequence": string | null;
  "DNA Sequence": string | null;
  Organism: string | null;
  "Expression System": string | null;
  "Molecular Weight": number;
  "Secondary Structure": string | null;
  "Bio Activity": string | null;
  "Half Life": number;
  "ISO Electric Point": number;
  "Melting Point": number;
  "Binding Site": string | null;
  Modification: string | null;
};

const generateBioData = (n: number): BioData[] => {
  const proteins = ["ProteinA", "ProteinB", "ProteinC", "ProteinD"];
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
    "Protein Name": randomChoice(proteins),
    Accession: `ACC${Math.floor(1000 + Math.random() * 9000)}`,
    "RNA Sequence": randomSequence(30),
    "DNA Sequence": randomSequence(30),
    Organism: randomChoice(organisms),
    "Expression System": randomChoice(expressionSystems),
    "Molecular Weight": parseFloat((10 + Math.random() * 90).toFixed(2)),
    "Secondary Structure": randomChoice(secondaryStructures),
    "Bio Activity": randomChoice(bioActivities),
    "Half Life": parseFloat((1 + Math.random() * 48).toFixed(2)),
    "ISO Electric Point": parseFloat((4 + Math.random() * 6).toFixed(2)),
    "Melting Point": parseFloat((40 + Math.random() * 60).toFixed(2)),
    "Binding Site": randomChoice(proteins),
    Modification: randomChoice(["Methylated", "Phosphorylated", "Acetylated"]),
  }));
};
const data: BioData[] = generateBioData(1000);

export const Default = () => {
  return (
    <Card>
      <NitroTable data={data} rowCount={100} />
    </Card>
  );
};
