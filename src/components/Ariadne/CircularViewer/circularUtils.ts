interface Stackable {
  start: number;
  end: number;
}

export const stackElements = (...elements: Stackable[]) => {
  // utility funcs for stackElements
  const last = (arr: Stackable[]): Stackable => arr[arr.length - 1];
  const first = (arr: Stackable[]): Stackable => arr[0];
  const maxIndex = elements.map((e) => e.end).reduce((a, b) => Math.max(a, b));

  const stack: Stackable[][] = [];
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
  return stack;
};
