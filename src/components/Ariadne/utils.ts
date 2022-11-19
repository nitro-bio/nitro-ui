import {
  AA,
  AnnotatedSequence,
  Annotation,
  Nucl,
  ValidatedSequence,
} from "./types";

export const getComplement = (sequence: string) => {
  const complement: {
    [key: string]: "A" | "T" | "C" | "G" | "N";
  } = {
    A: "T",
    T: "A",
    C: "G",
    G: "C",
    N: "N",
  };
  return sequence
    .split("")
    .map((base) => {
      if (base in complement) {
        return complement[base];
      } else {
        return "?";
      }
    })
    .join("");
};

export const getAnnotatedSequence = (
  sequence: ValidatedSequence,
  annotations: Annotation[]
): AnnotatedSequence => {
  /* loop through sequence finding all annoatations that apply to each base */

  const mapFn = (base: Nucl | AA, idx: number) => {
    const annotationsForBase = annotations.filter((annotation) => {
      return annotation.start <= idx && annotation.end >= idx;
    });
    return {
      base,
      index: idx,
      annotations: annotationsForBase,
      complement: getComplement(base),
    };
  };
  const annotatedSequence = sequence.map(mapFn);
  /* TODO: figure out how to get this to typecheck */
  return annotatedSequence as AnnotatedSequence;
};

interface Stackable {
  start: number;
  end: number;
}
// from seqviz
export const stackElements = <T extends Stackable>(elements: T[]) => {
  // utility funcs for stackElements
  const last = (arr: T[]): T => arr[arr.length - 1];
  const first = (arr: T[]): T => arr[0];
  const maxIndex = elements.map((e) => e.end).reduce((a, b) => Math.max(a, b));

  const stack: T[][] = [];
  elements.forEach((a) => {
    const insertIndex = stack.findIndex((elems) => {
      if (a.end === a.start) {
        // the element has the same start and end index and therefore spans the whole and gets its own row
        return -1;
      }
      if (last(elems).end <= last(elems).start) {
        // if the last element in this row crosses zero index it gets its own row
        return last(elems).end + maxIndex <= a.start;
      }
      if (a.end > a.start) {
        // this element doesn't cross the zero index and the last in row doesn't
        return last(elems).end <= a.start;
      }
      // both this curr element and the last in the row cross the zero index
      return last(elems).end < a.start && a.end < first(elems).start;
    });

    if (insertIndex > -1) {
      // insert in the row where it's the new highest
      stack[insertIndex].push(a);
    } else {
      // create a new row for this entry
      stack.push([a]);
    }
  });
  return stack.map((row) => row.sort((a, b) => a.start - b.start));
};
