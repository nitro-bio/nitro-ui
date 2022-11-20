import CircularIndex from "./CircularIndex";
import CircularAnnotationGutter from "./CircularAnnotations";
import { AnnotatedSequence, Annotation } from "../types";

export interface Props {
  sequence: AnnotatedSequence;
  size: number;
  annotations: Annotation[];
}

export const CircularViewer = ({ sequence, size, annotations }: Props) => {
  const { cx, cy, sizeX, sizeY, radius, strokeWidth } = {
    cx: size / 2,
    cy: size / 2,
    sizeX: size,
    sizeY: size,
    radius: (size - 10) / 2,
    strokeWidth: 2,
  };

  return (
    <div className="font-mono font-thin text-brand-400 flex items-center justify-center">
      <svg
        viewBox={`0 0 ${sizeX} ${sizeY}`}
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="inherit"
        fontSize="inherit"
        fontWeight="inherit"
        className={`stroke-current`}
        width={sizeX}
        height={sizeY}
      >
        <CircularIndex cx={cx} cy={cy} radius={radius} sequence={sequence} />
        <CircularAnnotationGutter
          sequence={sequence}
          annotations={annotations}
          cx={cx}
          cy={cy}
          radius={radius}
        />
      </svg>
    </div>
  );
};
