export interface BlastResponseDatum {
  id: string;
  queryRange: [number, number];
  targetRange: [number, number];
  score: number;
  identities: number;
  positives: number;
  gaps: number;
  frame: number;
  sequenceId: string;
  title: string;
  subtitle: string;
  target: string;
  query: string;
  midline: string;
}

export type SequenceBase = "DNA" | "Protein";
