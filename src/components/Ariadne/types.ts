import { z } from "zod";
import {
  GapSchema,
  SpaceSchema,
  StopSchema,
  UnknownSchema,
  aaSchema,
  angleSchema,
  annotatedBaseSchema,
  annotatedSequenceSchema,
  annotationSchema,
  annotationTypeSchema,
  ariadneSelectionSchema,
  coorSchema,
  nuclSchema,
  stackedAnnotationSchema,
  validatedSequenceStringSchema,
} from "./schemas";

export type Coor = z.infer<typeof coorSchema>;
export type Angle = z.infer<typeof angleSchema>;
export type AnnotationType = z.infer<typeof annotationTypeSchema>;
export type Annotation = z.infer<typeof annotationSchema>;
export type StackedAnnotation = z.infer<typeof stackedAnnotationSchema>;

export type Nucl = z.infer<typeof nuclSchema>;
export type AA = z.infer<typeof aaSchema>;
export type Gap = z.infer<typeof GapSchema>;
export type Stop = z.infer<typeof StopSchema>;
export type Space = z.infer<typeof SpaceSchema>;
export type Unknown = z.infer<typeof UnknownSchema>;
export type AnnotatedBase = z.infer<typeof annotatedBaseSchema>;
export type AnnotatedSequence = z.infer<typeof annotatedSequenceSchema>;

export type ValidatedSequence = z.infer<typeof validatedSequenceStringSchema>;

export type AriadneSelection = z.infer<typeof ariadneSelectionSchema>;
