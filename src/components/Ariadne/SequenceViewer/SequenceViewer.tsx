import { classNames } from "@utils/stringUtils";
import { cva, VariantProps } from "class-variance-authority";

import { AnnotatedSequence, StackedAnnotation } from "../types";

export interface Props {
  sequence: AnnotatedSequence;
}
export const SequenceViewer = ({ sequence }: Props) => {
  return (
    <>
      <div className="font-mono content-stretch text-md grid h-full overflow-y-scroll pt-4 text-center tracking-widest dark:bg-noir-800 md:mx-4">
        <div className="flex flex-row flex-wrap space-x-1">
          {sequence.map(({ base, complement, annotations, index }) => {
            return (
              <div key={`sequence-viewer-base-${index}`}>
                <CharComponent type="sequence" char={base} />{" "}
                <CharComponent type="complement" char={complement} />{" "}
                <SequenceAnnotation
                  annotations={annotations}
                  maxAnnotationStack={5}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

const SequenceAnnotation = ({
  annotations,
  maxAnnotationStack,
}: {
  annotations: StackedAnnotation[];
  maxAnnotationStack: number;
}) => {
  const orderedAnnotations = annotations.sort((a, b) => a.stack - b.stack);
  return (
    <>
      {[...Array(maxAnnotationStack).keys()].map((i) => {
        const annotation = orderedAnnotations.find((a) => a.stack === i);
        if (annotation) {
          return (
            <div
              key={`${annotation.start}-${annotation.end}-${annotation.color}`}
              className={classNames("h-1", annotation.color)}
            />
          );
        } else {
          return <div key={`placeholder-${i}`} className={"h-1"} />;
        }
      })}
    </>
  );
};

const charStyles = cva("whitespace-pre-wrap", {
  variants: {
    type: {
      sequence: "dark:text-brand-100 text-brand-400",
      midline_bar: "text-noir-400",
      midline_x: "text-red-400",
      complement: "dark:text-brand-300 text-brand-600 select-none",
    },
  },
  defaultVariants: {
    type: "sequence",
  },
});

interface IntermediateCharProps {
  char: string;
}

interface CharProps
  extends VariantProps<typeof charStyles>,
    IntermediateCharProps {}

const CharComponent = ({ char, type }: CharProps) => (
  <div className={charStyles({ type: type || "sequence" })}>{char}</div>
);
