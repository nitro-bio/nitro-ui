import { AnnotatedSequence, Annotation } from "../types";

export interface Props {
  sequence: AnnotatedSequence;
  annotations: Annotation[];
  size: number;
}

export const LinearViewer = (props: Props) => {
  const { sequence, size } = props;
  const [sizeX, sizeY] = [size, size];
  return (
    <div className="font-mono p-6 font-thin text-brand-400">
      <svg
        viewBox={`0 0 200 200`}
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="inherit"
        fontSize="inherit"
        fontWeight="inherit"
        className="stroke-current"
        width={"100%"}
        height={"100%"}
      >
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="currentColor"
          strokeWidth={10}
        />
      </svg>
    </div>
  );
};
