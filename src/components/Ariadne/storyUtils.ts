import { getRndInteger } from "../..";
import type { Annotation } from "./types";

const colors = [
  "dark:text-red-500 dark:bg-red-500 text-red-300 bg-red-300",
  "dark:text-blue-500 dark:bg-blue-500 text-blue-300 bg-blue-300",
  "dark:text-green-500 dark:bg-green-500 text-green-300 bg-green-300",
  "dark:text-yellow-500 dark:bg-yellow-500 text-yellow-300 bg-yellow-300",
  "dark:text-orange-500 dark:bg-orange-500 text-orange-300 bg-orange-300",
  "dark:text-purple-500 dark:bg-purple-500 text-purple-300 bg-purple-300",
  "dark:text-sky-500 dark:bg-sky-500 text-sky-300 bg-sky-300",
  "dark:text-teal-500 dark:bg-teal-500 text-teal-300 bg-teal-300",
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
    const randomColor = colors[getRndInteger(0, colors.length)];
    const annotation = {
      start,
      end,
      color: randomColor,
      text: `Example Annotation ${i}`,
      onClick: () => console.log("Clicked on annotation ${i}"),
    };
    annotations.push(annotation);
    if (annotations.length >= maxAnnotations) {
      break;
    }
  }
  return annotations;
};
