import { getRndInteger } from "../..";
import { Annotation, annotationTypes } from "./types";

const classNames = [
  "dark:text-red-500 dark:bg-red-500 dark:hover:fill-red-300/80 text-red-300 bg-red-300 hover:fill-red-500",
  "dark:text-blue-500 dark:bg-blue-500 dark:hover:fill-blue-300/80 text-blue-300 bg-blue-300 hover:fill-blue-500",
  "dark:text-green-500 dark:bg-green-500 dark:hover:fill-green-300/80 text-green-300 bg-green-300 hover:fill-green-500",
  "dark:text-yellow-500 dark:bg-yellow-500 dark:hover:fill-yellow-300/80 text-yellow-300 bg-yellow-300 hover:fill-yellow-500",
  "dark:text-orange-500 dark:bg-orange-500 dark:hover:fill-orange-300/80 text-orange-300 bg-orange-300 hover:fill-orange-500",
  "dark:text-purple-500 dark:bg-purple-500 dark:hover:fill-purple-300/80 text-purple-300 bg-purple-300 hover:fill-purple-500",
  "dark:text-sky-500 dark:bg-sky-500 dark:hover:fill-sky-300/80 text-sky-300 bg-sky-300 hover:fill-sky-500",
  "dark:text-teal-500 dark:bg-teal-500 dark:hover:fill-teal-300/80 text-teal-300 bg-teal-300 hover:fill-teal-500",
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
