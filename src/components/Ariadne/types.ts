export interface Coor {
  x: number;
  y: number;
}
export interface Angle {
  degrees: number;
  center: Coor;
}

export interface Annotation {
  start: number;
  end: number;
  color: string;
  text: string;
  onClick: () => void;
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

// TODO: want to make a generic that paramaterizes over AA or Nucl
export interface AnnotatedNucl {
  base: Nucl;
  complement: Nucl;
  annotations: StackedAnnotation[];
  index: number;
}

export interface AnnotatedAA {
  base: AA;
  complement: AA;
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
