import { getRndInteger } from "../..";
import { Annotation, annotationTypes } from "./types";

const classNames = [
  "cursor-pointer text-white opacity-50 hover:opacity-100 bg-red-600 fill-red-600 stroke-red-600",
  "cursor-pointer text-white opacity-50 hover:opacity-100 bg-blue-600 fill-blue-600 stroke-blue-600 ",
  "cursor-pointer text-white opacity-50 hover:opacity-100 bg-green-600 fill-green-600 stroke-green-600 ",
  "cursor-pointer text-white opacity-50 hover:opacity-100 bg-yellow-600 fill-yellow-600 stroke-yellow-600 ",
  "cursor-pointer text-white opacity-50 hover:opacity-100 bg-orange-600 fill-orange-600 stroke-orange-600 ",
  "cursor-pointer text-white opacity-50 hover:opacity-100 bg-purple-600 fill-purple-600 stroke-purple-600 ",
  "cursor-pointer text-white opacity-50 hover:opacity-100 bg-sky-600 fill-sky-600 stroke-sky-600 ",
  "cursor-pointer text-white opacity-50 hover:opacity-100 bg-teal-600 fill-teal-600 stroke-teal-600 ",
];

export const generateRandomAnnotations = (
  sequence: string,
  maxAnnotations: number
) => {
  const annotations: Annotation[] = [];
  const max_annotation_length = sequence.length / 3;
  const min_annotation_length = 1;

  for (let i = 0; i < sequence.length; i++) {
    const start = getRndInteger(0, sequence.length);
    const end =
      getRndInteger(
        start + min_annotation_length,
        start + max_annotation_length
      ) % sequence.length;
    const randomClassName = classNames[getRndInteger(0, classNames.length)];
    const annType = annotationTypes[getRndInteger(0, annotationTypes.length)];
    const annotation: Annotation = {
      type: annType,
      start,
      end,
      direction: getRndInteger(0, 2) === 0 ? "forward" : "reverse",
      className: randomClassName,
      text: `${annType} ${i}`,
      onClick: () => console.debug("Clicked on annotation ${i}"),
    };
    annotations.push(annotation);
    if (annotations.length >= maxAnnotations) {
      break;
    }
  }
  return annotations;
};
