import { useTextSelection } from "@Ariadne/hooks/useSelection";
import { baseInSelection } from "@Ariadne/utils";
import { classNames } from "@utils/stringUtils";
import { cva, VariantProps } from "class-variance-authority";
import { useEffect, useRef } from "react";

import {
  AnnotatedSequence,
  AriadneSelection,
  StackedAnnotation,
} from "../types";

export interface Props {
  sequence: AnnotatedSequence;
  selection: AriadneSelection | null;
  setSelection: (selection: AriadneSelection) => void;
}
export const SequenceViewer = ({
  sequence,
  selection,
  setSelection,
}: Props) => {
  const selectionRef = useRef<HTMLDivElement>(null);
  const { range } = useTextSelection(selectionRef);

  useEffect(
    function propagateSelectionUp() {
      if (selectionRef.current && range?.startContainer) {
        const startIdx =
          range?.startContainer?.parentElement?.getAttribute("data-seq-index");
        const endIdx =
          range?.endContainer?.parentElement?.getAttribute("data-seq-index");
        if (startIdx && endIdx) {
          setSelection({
            start: parseInt(startIdx),
            end: parseInt(endIdx),
            direction: startIdx < endIdx ? "forward" : "reverse",
          });
        }
      }
    },
    [range]
  );
  return (
    <>
      <div
        className="font-mono content-stretch text-md grid h-full overflow-y-scroll pt-4 text-center tracking-widest dark:bg-noir-800 md:mx-4"
        ref={selectionRef}
      >
        <div className="mx-1 flex flex-row flex-wrap space-x-1">
          {sequence.map(({ base, complement, annotations, index }) => {
            return (
              <div key={`sequence-viewer-base-${index}`} data-seq-index={index}>
                <CharComponent type="sequence" char={base} index={index} />
                <SelectionMarker
                  index={index}
                  selection={selection}
                  sequenceLength={sequence.length}
                />
                <CharComponent
                  type="complement"
                  char={complement}
                  index={index}
                />
                <SequenceAnnotation
                  annotations={annotations}
                  maxAnnotationStack={5}
                  index={index}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

const SelectionMarker = ({
  index,
  selection,
  sequenceLength,
}: {
  index: number;
  selection: AriadneSelection | null;
  sequenceLength: number;
}) => {
  return (
    <div
      key={`sequence-viewer-base-${index}`}
      className={classNames(
        "h-1",
        selection &&
          baseInSelection(index, selection, sequenceLength) &&
          "-mx-1 bg-brand-300"
      )}
    />
  );
};

const SequenceAnnotation = ({
  annotations,
  maxAnnotationStack,
  index,
}: {
  annotations: StackedAnnotation[];
  maxAnnotationStack: number;
  index: number;
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
              data-seq-index={index}
            />
          );
        } else {
          return (
            <div
              key={`placeholder-${i}`}
              className={"h-1"}
              data-seq-index={index}
            />
          );
        }
      })}
    </>
  );
};

const charStyles = cva("whitespace-pre-wrap appearance-none", {
  variants: {
    type: {
      sequence: "dark:text-brand-300 text-brand-600",
      midline_bar: "text-noir-400",
      midline_x: "text-red-400",
      complement: "dark:text-brand-100 text-brand-400/80 select-none",
    },
  },
  defaultVariants: {
    type: "sequence",
  },
});

interface IntermediateCharProps {
  char: string;
  index: number;
}

interface CharProps
  extends VariantProps<typeof charStyles>,
    IntermediateCharProps {}

/* data-seq-index is used to get indices for selection */
const CharComponent = ({ index, char, type }: CharProps) => (
  <div
    data-seq-index={index}
    className={charStyles({ type: type || "sequence" })}
  >
    {char}
  </div>
);
