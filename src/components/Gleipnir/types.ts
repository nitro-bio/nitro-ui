export type Gene = { id: string; label: string; description: string };
export type Protein = { id: string; pdb: string };
export type Reaction = {
  id: string;
  source: string;
  target: string;
  fwdProduct: string;
  revProduct: string;
};
