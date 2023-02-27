import type {
  AA,
  AnnotatedSequence,
  Annotation,
  AriadneSelection,
  Nucl,
  StackedAnnotation,
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
  stackedAnnotations: StackedAnnotation[]
): AnnotatedSequence => {
  /* loop through sequence finding all annoatations that apply to each base */
  const mapFn = (base: Nucl | AA, idx: number) => {
    const annotationsForBase = stackedAnnotations.filter((annotation) => {
      // if the annotation spans the seam of the plasmid
      if (annotation.start > annotation.end) {
        const isBetweenAnnotationStartAndEndofSequence =
          idx >= annotation.start && idx <= sequence.length;
        const isBetweenStartOfSequenceAndAnnotationEnd =
          idx >= 0 && idx <= annotation.end;
        return (
          isBetweenAnnotationStartAndEndofSequence ||
          isBetweenStartOfSequenceAndAnnotationEnd
        );
      } else {
        // regular case
        return idx >= annotation.start && idx <= annotation.end;
      }
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
// modified from seqviz
export const stackElements = <T extends Stackable>(elements: T[]) => {
  if (elements.length === 0) {
    return [];
  }
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

// returns annotations with their stack index and max stack index
export const getStackedAnnotations = (
  annotations: Annotation[]
): StackedAnnotation[] => {
  const stackedAnnotations = stackElements(annotations);
  return stackedAnnotations
    .map((row, idx) => row.map((annotation) => ({ ...annotation, stack: idx })))
    .flat();
};
export const baseInSelection = (
  baseIndex: number,
  selection: AriadneSelection | null
) => {
  if (!selection) {
    return false;
  }
  let { start, end, direction } = selection;
  if (start === end) {
    if (direction === "forward") {
      // we're selecting a single base
      return baseIndex === start;
    } else {
      // we're selecting everything but a single base
      return baseIndex !== start;
    }
  }
  if (direction === "reverse") {
    [start, end] = [end, start];
    direction = "forward";
  }
  if (start < end) {
    return baseIndex >= start && baseIndex <= end;
  } else {
    return baseIndex >= start || baseIndex <= end;
  }
};

export const inRange = (value: number, min: number, max: number) => {
  return value >= min && value <= max;
};

export const getSubsequenceLength = (
  { start, end, direction }: AriadneSelection,
  sequenceLength: number
) => {
  if (direction === "reverse") {
    [start, end] = [end, start];
  }
  if (start < end) {
    return end - start;
  } else {
    return sequenceLength - start + end;
  }
};
