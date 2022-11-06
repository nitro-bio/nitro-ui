export interface BlastResponseDatum {
  id: string;
  query_range: [number, number];
  target_range: [number, number];
  score: number;
  identities: number;
  positives: number;
  gaps: number;
  frame: number;
  sequence_id: string;
  title: string;
  subtitle: string;
  target: string;
  query: string;
  midline: string;
}

export type SequenceBase = "DNA" | "Protein";
