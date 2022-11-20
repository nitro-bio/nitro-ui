import { Coor } from "../types";

/**
 * Taken from seqviz
 * Given an inner and outer radius, and the length of the element, return the
 * path for an arc that circles the plasmid. The optional paramters sweepFWD and sweepREV
 * are needed for selection arcs (where the direction of the arc isn't known beforehand)
 * and arrowFWD and arrowREV are needed for annotations, where there may be directionality
 */
export const genArc = ({
  center,
  innerRadius,
  largeArc,
  length,
  offset,
  outerRadius,
  seqLength,
  sweepFWD,
}: {
  center: Coor;
  innerRadius: number;
  largeArc: boolean;
  length: number;
  offset: number;
  outerRadius: number;
  seqLength: number;
  sweepFWD: boolean;
}): string => {
  // build up the six default coordinates
  const leftBottom = findCoor({
    index: offset,
    radius: innerRadius,

    center,
    seqLength,
  });
  const leftTop = findCoor({
    index: offset,
    radius: outerRadius,

    center,
    seqLength,
  });
  const rightBottom = findCoor({
    index: length + offset,
    radius: innerRadius,

    center,
    seqLength,
  });
  const rightTop = findCoor({
    index: length + offset,
    radius: outerRadius,

    center,
    seqLength,
  });

  const lArc = largeArc ? 1 : 0;
  const sFlagF = sweepFWD ? 1 : 0;
  const sFlagR = sweepFWD ? 0 : 1;

  return `M ${rightBottom.x} ${rightBottom.y}
      A ${innerRadius} ${innerRadius}, 0, ${lArc}, ${sFlagR}, ${leftBottom.x} ${leftBottom.y}
      L ${leftBottom.x} ${leftBottom.y}
      L ${leftTop.x} ${leftTop.y}
      A ${outerRadius} ${outerRadius}, 0, ${lArc}, ${sFlagF}, ${rightTop.x} ${rightTop.y}
      Z`;
};

/**
 * Given an index along the plasmid and its radius, find svg coordinate
 * from seqviz
 */
export const findCoor = ({
  index,
  radius,
  center,
  seqLength,
}: {
  index: number;
  radius: number;

  center: Coor;
  seqLength: number;
}): Coor => {
  const lengthPerc = index / seqLength;
  const lengthPercCentered = lengthPerc - 0.25;
  const radians = lengthPercCentered * Math.PI * 2;
  const xAdjust = Math.cos(radians) * radius;
  const yAdjust = Math.sin(radians) * radius;

  return {
    x: center.x + xAdjust,
    y: center.y + yAdjust,
  };
};
