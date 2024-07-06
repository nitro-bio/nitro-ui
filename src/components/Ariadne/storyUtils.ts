import { getRndInteger, validatedSequenceStringSchema } from "../..";
import { Annotation, ValidatedSequence } from "./types";

const annotationTypes = [
  "CDS",
  "enhancer",
  "intron",
  "misc_feature",
  "polyA_signal",
  "promoter",
  "protein_bind",
  "rep_origin",
  "LTR",
  "source",
  "insertion",
];
const classNames = [
  "cursor-pointer text-white truncate opacity-50 group-hover:opacity-100 hover:opacity-100 bg-red-600 fill-red-600 stroke-red-600",
  "cursor-pointer text-white truncate opacity-50 group-hover:opacity-100 hover:opacity-100 bg-blue-600 fill-blue-600 stroke-blue-600 ",
  "cursor-pointer text-white truncate opacity-50 group-hover:opacity-100 hover:opacity-100 bg-green-600 fill-green-600 stroke-green-600 ",
  "cursor-pointer text-white truncate opacity-50 group-hover:opacity-100 hover:opacity-100 bg-yellow-600 fill-yellow-600 stroke-yellow-600 ",
  "cursor-pointer text-white truncate opacity-50 group-hover:opacity-100 hover:opacity-100 bg-orange-600 fill-orange-600 stroke-orange-600 ",
  "cursor-pointer text-white truncate opacity-50 group-hover:opacity-100 hover:opacity-100 bg-purple-600 fill-purple-600 stroke-purple-600 ",
  "cursor-pointer text-white truncate opacity-50 group-hover:opacity-100 hover:opacity-100 bg-sky-600 fill-sky-600 stroke-sky-600 ",
  "cursor-pointer text-white truncate opacity-50 group-hover:opacity-100 hover:opacity-100 bg-teal-600 fill-teal-600 stroke-teal-600 ",
];

export const generateRandomAnnotations = ({
  sequence,
  maxAnnotations,
  annotationOnClick,
}: {
  sequence: string;
  maxAnnotations: number;
  annotationOnClick?: (annotation: Annotation) => void;
}): Annotation[] => {
  const annotations: Annotation[] = [];
  const max_annotation_length = sequence.length;
  const min_annotation_length = 1;

  for (let i = 0; i < sequence.length; i++) {
    const start = getRndInteger(0, sequence.length);
    const end =
      getRndInteger(
        start + min_annotation_length,
        start + max_annotation_length,
      ) % sequence.length;
    const randomClassName = classNames[getRndInteger(0, classNames.length)];
    const annType = annotationTypes[getRndInteger(0, annotationTypes.length)];
    const annotation: Annotation = {
      type: annType,
      start,
      end,
      direction: i % 2 === 0 ? "forward" : "reverse",
      className: randomClassName,
      text: `${annType} ${i}`,
      onClick: () => {
        console.debug(
          `Clicked on annotation ${i}: ${annotation.start} - ${annotation.end}`,
        );
        annotationOnClick && annotationOnClick(annotation);
      },
    };
    annotations.push(annotation);
    if (annotations.length >= maxAnnotations) {
      break;
    }
  }

  return annotations;
};

export const generateRandomSequences = ({
  maxSequences,
  maxLength,
  annotationOnClick,
}: {
  maxSequences: number;
  maxLength: number;
  annotationOnClick?: (annotation: Annotation) => void;
}): {
  sequences: ValidatedSequence[];
  annotations: Annotation[];
} => {
  const bases = ["A", "C", "G", "T"];
  // generate one sequence of max Length
  const rootSequence = Array.from(
    { length: maxLength },
    () => bases[getRndInteger(0, bases.length)],
  );
  const annotations = generateRandomAnnotations({
    sequence: rootSequence.join(""),
    maxAnnotations: 3,
    annotationOnClick,
  });
  const sequences: string[][] = [rootSequence];

  // generate one sequence of max Length

  Array.from({ length: maxSequences - 1 }, () => {
    const startIdx = getRndInteger(0, rootSequence.length - 10);
    const endIdx = getRndInteger(startIdx * 1.1, rootSequence.length);
    const sequence = Array.from({ length: rootSequence.length }, (_, j) => {
      if (j < startIdx || j > endIdx) {
        return " "; // pad subsequence to make it same length as rootSequence
      }
      if (getRndInteger(0, 100) < 10) {
        const basesPlusDeletion = ["A", "C", "G", "T", "-"];
        return basesPlusDeletion[getRndInteger(0, basesPlusDeletion.length)];
      } else {
        return rootSequence[j];
      }
    });
    sequences.push(sequence);
  });
  return {
    sequences: sequences.map((seq) => validatedSequenceStringSchema.parse(seq)),
    annotations,
  };
};
