export interface Coor {
  x: number;
  y: number;
}
export interface Annotation {
  start: number;
  end: number;
  color: string;
  text: string;
  onClick: () => void;
}

export type Nucl = "A" | "C" | "G" | "T";
export type AA =
  | "A"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "K"
  | "L"
  | "M"
  | "N"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "V"
  | "W"
  | "Y";

// TODO: want to make a generic that paramaterizes over AA or Nucl
export interface AnnotatedNucl {
  base: Nucl;
  complement: Nucl;
  annotations: Annotation[];
  index: number;
}

export interface AnnotatedAA {
  base: AA;
  complement: AA;
  annotations: Annotation[];
  index: number;
}
export type AnnotatedSequence = AnnotatedNucl[] | AnnotatedAA[];
export type ValidatedSequence = Nucl[] | AA[];
