import {
  getAnnotatedSequence,
  getRndInteger,
  getStackedAnnotations,
} from "../..";
import {
  AnnotatedSequence,
  Annotation,
  StackedAnnotation,
  ValidatedSequence,
} from "./types";

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

export const generateRandomAnnotations = (
  sequence: string,
  maxAnnotations: number,
  annotationOnClick?: (annotation: Annotation) => void,
) => {
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
  annotatedSequences: AnnotatedSequence[];
  stackedAnnotations: StackedAnnotation[];
} => {
  const bases = ["A", "C", "G", "T"];
  // generate one sequence of max Length
  const rootSequence = Array.from(
    { length: maxLength },
    () => bases[getRndInteger(0, bases.length)],
  );
  const annotations = generateRandomAnnotations(
    rootSequence.join(""),
    5,
    annotationOnClick,
  );
  const rootAnnotatedSequence = getAnnotatedSequence(
    rootSequence as ValidatedSequence,
    getStackedAnnotations(annotations),
  );
  const sequences: AnnotatedSequence[] = [rootAnnotatedSequence];

  // generate one sequence of max Length

  Array.from({ length: maxSequences - 1 }, () => {
    const startIdx = getRndInteger(0, rootSequence.length);
    const endIdx = getRndInteger(startIdx + 1, rootSequence.length);
    const sequence = Array.from({ length: endIdx - startIdx }).map((_, j) => {
      if (getRndInteger(0, 100) < 10) {
        const basesPlusDeletion = ["A", "C", "G", "T", "-"];
        return basesPlusDeletion[getRndInteger(0, basesPlusDeletion.length)];
      } else {
        return rootSequence[startIdx + j];
      }
    });

    const annotatedSequence = getAnnotatedSequence(
      sequence as ValidatedSequence,
      [],
    ).map((x) => ({ ...x, index: x.index + startIdx }));
    sequences.push(annotatedSequence as AnnotatedSequence);
  });
  return {
    annotatedSequences: sequences,
    stackedAnnotations: getStackedAnnotations(annotations),
  };
};
