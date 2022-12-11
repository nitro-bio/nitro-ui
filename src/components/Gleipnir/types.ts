export const GENES = [
  { id: "Ras", label: "Ras" },
  { id: "RGL", label: "RGL" },
  { id: "Ral", label: "Ral" },
  { id: "RalBP1", label: "RalBP1" },
  { id: "Sec5", label: "Sec5" },
  { id: "JNK", label: "JNK" },
  { id: "PLD", label: "PLD" },
  { id: "Rac", label: "Rac" },
  { id: "TBK1", label: "TBK1" },
  { id: "NFxB", label: "NFxB" },
];
export const PATHWAY = [
  {
    id: "Ras->RGL",
    source: "Ras",
    target: "RGL",
    data: { label: "Product a" },
  },
  {
    id: "RGL->Ral",
    source: "RGL",
    target: "Ral",
    data: { label: "Product b" },
  },
  {
    id: "Ral->RalBP1",
    source: "Ral",
    target: "RalBP1",
    data: { label: "Product c" },
  },
  {
    id: "RalBP1->Rac",
    source: "RalBP1",
    target: "Rac",
    data: { label: "Product d" },
  },
  {
    id: "Ral->PLD",
    source: "Ral",
    target: "PLD",
    data: { label: "Product e" },
  },
  {
    id: "Ral->Sec5",
    source: "Ral",
    target: "Sec5",
    data: { label: "Product f" },
  },
  {
    id: "Sec5->TBK1",
    source: "Sec5",
    target: "TBK1",
    data: { label: "Product g" },
  },
  {
    id: "TBK1->NFxB",
    source: "TBK1",
    target: "NFxB",
    data: { label: "Product h" },
  },

  { id: "Ral->JNK", source: "Ral", target: "JNK" },
];
export type Gene = typeof GENES[number];
