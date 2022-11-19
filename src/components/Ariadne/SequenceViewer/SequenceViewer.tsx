import { classNames } from "@utils/stringUtils";
import { cva, VariantProps } from "class-variance-authority";

import {
  AA,
  AnnotatedSequence,
  Annotation,
  Nucl,
  ValidatedSequence,
} from "../types";
import { getComplement } from "../utils";

export interface Props {
  sequence: AnnotatedSequence;
}
export const SequenceViewer = ({ sequence }: Props) => {
  return (
    <>
      <div className="leading-0 justify-start font-mono flex flex-wrap pt-4 text-center text-3xl tracking-widest dark:bg-noir-800 md:mx-4 h-full overflow-scroll h-full">
        <div className="flex flex-row flex-wrap space-x-1">
          {sequence.map(({ base, complement, annotations, index }) => {
            return (
              <div
                className="mb-8 select-none"
                key={`sequence-viewer-base-${index}`}
              >
                <CharComponent type="sequence" char={base} />{" "}
                <CharComponent type="complement" char={complement} />{" "}
                <SequenceAnnotation annotations={annotations} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

const SequenceAnnotation = ({ annotations }: { annotations: Annotation[] }) => {
  return (
    <>
      {annotations.map((annotation) => {
        return (
          <div
            key={`${annotation.start}-${annotation.end}-${annotation.color}`}
            className={classNames("h-4", `bg-${annotation.color}-300`)}
          />
        );
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
      complement: "dark:text-brand-300 text-brand-600",
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
