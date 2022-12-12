import { Gene, Protein, Reaction } from "./types";
const GENE_LORUM_IPSUM =
  "A family of genes that make proteins involved in cell signaling pathways that control cell growth and cell death. Mutated (changed) forms of the RAS gene may be found in some types of cancer. These changes may cause cancer cells to grow and spread in the body. Members of the RAS gene family include KRAS, HRAS, and NRAS.";
export const GENES: Gene[] = [
  { id: "Ras", label: "Ras", description: GENE_LORUM_IPSUM },
  { id: "RGL", label: "RGL", description: GENE_LORUM_IPSUM },
  { id: "Ral", label: "Ral", description: GENE_LORUM_IPSUM },
  { id: "RalBP1", label: "RalBP1", description: GENE_LORUM_IPSUM },
  { id: "Sec5", label: "Sec5", description: GENE_LORUM_IPSUM },
  { id: "JNK", label: "JNK", description: GENE_LORUM_IPSUM },
  { id: "PLD", label: "PLD", description: GENE_LORUM_IPSUM },
  { id: "Rac", label: "Rac", description: GENE_LORUM_IPSUM },
  { id: "TBK1", label: "TBK1", description: GENE_LORUM_IPSUM },
  { id: "NFxB", label: "NFxB", description: GENE_LORUM_IPSUM },
];

export const PROTEINS: Protein[] = [
  { id: "Ras", pdb: "1LFD" },
  { id: "RGL", pdb: "2P0K" },
  { id: "Ral", pdb: "4X4X" },
  { id: "RalBP1", pdb: "3J9C" },
  { id: "Sec5", pdb: "2P0K" },
  { id: "JNK", pdb: "1LFD" },
  { id: "PLD", pdb: "2P0K" },
  { id: "Rac", pdb: "1RAC" },
  { id: "TBK1", pdb: "1TBK" },
  { id: "NFxB", pdb: "1NFX" },
];
export const REACTIONS: Reaction[] = [
  {
    id: "Ras->RGL",
    source: "Ras",
    target: "RGL",
    fwdProduct: "Product a",
    revProduct: "Product 0",
  },
  {
    id: "RGL->Ral",
    source: "RGL",
    target: "Ral",
    fwdProduct: "Product b",
    revProduct: "Product 1",
  },
  {
    id: "Ral->RalBP1",
    source: "Ral",
    target: "RalBP1",
    fwdProduct: "Product c",
    revProduct: "Product 2",
  },
  {
    id: "RalBP1->Rac",
    source: "RalBP1",
    target: "Rac",
    fwdProduct: "Product d",
    revProduct: "Product 3",
  },
  {
    id: "Ral->PLD",
    source: "Ral",
    target: "PLD",
    fwdProduct: "Product e",
    revProduct: "Product 4",
  },
  {
    id: "Ral->Sec5",
    source: "Ral",
    target: "Sec5",
    fwdProduct: "Product f",
    revProduct: "Product 5",
  },
  {
    id: "Sec5->TBK1",
    source: "Sec5",
    target: "TBK1",
    fwdProduct: "Product g",
    revProduct: "Product 6",
  },
  {
    id: "TBK1->NFxB",
    source: "TBK1",
    target: "NFxB",
    fwdProduct: "Product h",
    revProduct: "Product 7",
  },

  {
    id: "Ral->JNK",
    source: "Ral",
    target: "JNK",
    fwdProduct: "Product i",
    revProduct: "Product 8",
  },
];
