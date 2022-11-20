import { getRndInteger } from "../..";
import type { Annotation } from "./types";

const colors = [
  "text-red-300 bg-red-300",
  "text-blue-300 bg-blue-300",
  "text-green-300 bg-green-300",
  "text-yellow-300 bg-yellow-300",
  "text-orange-300 bg-orange-300",
  "text-purple-300 bg-purple-300",
  "text-sky-300 bg-sky-300",
  "text-teal-300 bg-teal-300",
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
    const end = getRndInteger(
      start + min_annotation_length,
      start + max_annotation_length
    );
    const randomColor = colors[getRndInteger(0, colors.length)];
    const annotation = {
      start,
      end,
      color: randomColor,
      text: "Example Annotation ${i}",
      onClick: () => console.log("Clicked on annotation ${i}"),
    };
    annotations.push(annotation);
    if (annotations.length >= maxAnnotations) {
      break;
    }
  }
  return annotations;
};
