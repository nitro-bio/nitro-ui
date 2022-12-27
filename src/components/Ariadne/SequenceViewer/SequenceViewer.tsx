import { useTextSelection } from "@Ariadne/hooks/useSelection";
import { baseInSelection, getIndexes } from "@Ariadne/utils";
import { classNames } from "@utils/stringUtils";
import { cva, VariantProps } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";

import {
  AnnotatedSequence,
  AriadneSearch,
  AriadneSelection,
  StackedAnnotation,
} from "../types";

export interface Props {
  sequence: AnnotatedSequence;
  selection: AriadneSelection | null;
  search: AriadneSearch | null;
  setSelection: (selection: AriadneSelection | null) => void;
}
export const SequenceViewer = ({
  sequence,
  selection,
  setSelection,
  search,
}: Props) => {
  const selectionRef = useRef<HTMLDivElement>(null);
  const { range } = useTextSelection(selectionRef);

  const [selections, setSelections] = useState<AriadneSelection[]>([]);
  const [searchVal, setSearchVal] = useState<AriadneSearch | null>(search);

  useEffect(() => {
    if (search && search.searchString !== searchVal?.searchString) {
      setSelection(null);
      if (
        sequence.raw.includes(search.searchString.toUpperCase()) &&
        search.strand === "main"
      ) {
        const result = getIndexes(sequence.raw, search.searchString, false);
        setSelections(result);
      } else if (search && search.strand === "complement") {
        let splitString = sequence.raw.split("");
        splitString = splitString.reverse();
        const basePairMap: any = { A: "T", T: "A", C: "G", G: "C" };
        const complement = splitString.map((base: string) => {
          return basePairMap[base];
        });

        const complementString = complement.join("");

        const result = getIndexes(complementString, search.searchString, true);
        console.log(result);
        setSelections(result);
      } else if (search?.strand === "both") {
        const forwardResult = getIndexes(
          sequence.raw,
          search.searchString,
          false
        );

        let splitString = sequence.raw.split("");
        splitString = splitString.reverse();
        const basePairMap: any = { A: "T", T: "A", C: "G", G: "C" };
        const complement = splitString.map((base: string) => {
          return basePairMap[base];
        });

        const complementString = complement.join("");

        const reverseResult = getIndexes(
          complementString,
          search.searchString,
          true
        );
        let result = null;
        if (forwardResult) {
          result = forwardResult.concat(reverseResult);
        } else {
          result = reverseResult;
        }

        setSelections(result);
      } else {
        setSelections([]);
      }
    } else {
      setSelections([]);
    }
    setSearchVal(search);
  }, [search]);

  useEffect(
    function propagateSelectionUp() {
      if (selectionRef.current && range?.startContainer) {
        const startIdx =
          range?.startContainer?.parentElement?.getAttribute("data-seq-index");
        const endIdx =
          range?.endContainer?.parentElement?.getAttribute("data-seq-index");
        if (startIdx && endIdx) {
          setSelections([]);
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
        className="font-mono content-stretch text-md grid h-full overflow-y-scroll bg-white pt-4 text-center tracking-widest dark:bg-noir-800 md:mx-4"
        ref={selectionRef}
      >
        <div className="mx-1 flex flex-row flex-wrap space-x-1">
          {sequence.annotated.map(
            ({ base, complement, annotations, index }) => {
              return (
                <div
                  key={`sequence-viewer-base-${index}`}
                  data-seq-index={index}
                >
                  <CharComponent type="sequence" char={base} index={index} />

                  {selections.length > 0 &&
                    selections.map((selection: AriadneSelection) => {
                      if (
                        baseInSelection(index, selection, sequence.raw.length)
                      ) {
                        return (
                          <SelectionMarker
                            key={index}
                            index={index}
                            selection={selection}
                            sequenceLength={sequence.raw.length}
                          />
                        );
                      }
                    })}
                  <SelectionMarker
                    index={index}
                    selection={selection}
                    sequenceLength={sequence.raw.length}
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
            }
          )}
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
