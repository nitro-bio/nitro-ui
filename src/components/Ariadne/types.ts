export interface Coor {
  x: number;
  y: number;
}
export interface Angle {
  degrees: number;
  center: Coor;
}

export const annotationTypes = [
  "CDS",
  "enhancer",
  "intron",
  "misc_feature",
  "polyA_signal",
  "promoter",
  "protein_bind",
  "rep_origin",
];

export type AnnotationType = typeof annotationTypes[number];

export interface Annotation {
  type: AnnotationType;
  direction: "forward" | "reverse";
  start: number;
  end: number;
  className?: string;
  text: string;
  onClick: (ann: Annotation) => void;
}

export interface StackedAnnotation extends Annotation {
  stack: number;
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
export type Gap = "-";
export type Stop = "*";
export type Space = " ";

// TODO: want to make a generic that paramaterizes over AA or Nucl
export interface AnnotatedNucl {
  base: Nucl | Gap | Space;
  annotations: StackedAnnotation[];
  index: number;
}

export interface AnnotatedAA {
  base: AA | Gap | Stop | Space;
  annotations: StackedAnnotation[];
  index: number;
}
export type AnnotatedSequence = AnnotatedNucl[] | AnnotatedAA[];
export type ValidatedSequence = Nucl[] | AA[];

export type AriadneSelection = {
  start: number;
  end: number;
  direction: "forward" | "reverse";
};
