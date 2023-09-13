import { getABData } from "@Ariadne/ABViewer/ABViewer";
import { AnnotatedAA, AnnotatedNucl, ValidatedSequence } from "@Ariadne/types";
import { getAnnotatedSequence } from "@Ariadne/utils";
import { Card } from "@ui/Card";
import { useMemo } from "react";

import { HeadTailViewer } from ".";

export default {
  title: "Ariadne/HeadTailViewer",
  component: HeadTailViewer,
  argTypes: {
    sequence: { type: "string" },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Default = () => {
  const sequence1 =
    "ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG";
  const sequence2 =
    "GGGGGGGTTTTTCCCCCAAAAAAGGGGGGGTTTTTCCCCCAAAAAAGGGGGGGTTTTTCC";
  const validatedSequences = [sequence1, sequence2].map((seq) =>
    seq.split("")
  ) as ValidatedSequence[];
  const annotatedSequences = validatedSequences.map((seq) =>
    getAnnotatedSequence(seq, [])
  );
  const abData = useMemo(() => getABData(sequence1), [sequence1]);
  const charClassName = ({
    base,
    sequenceIdx,
  }: {
    sequenceIdx: number;
    base: AnnotatedNucl | AnnotatedAA;
  }): string => {
    const className = [""];
    if (sequenceIdx == 0) {
      if (base.base === "G") {
        className.push("text-rose-300");
      } else if (base.base === "A") {
        className.push("text-amber-300");
      } else if (base.base === "T") {
        className.push("text-emerald-300");
      } else if (base.base === "C") {
        className.push("text-blue-300");
      }
    } else {
      const seqBase = annotatedSequences[1].find(
        (b: AnnotatedAA | AnnotatedNucl) => {
          return b.index === base.index;
        }
      );
      if (!seqBase) {
        className.push("text-noir-100");
      } else if (seqBase.base !== base.base) {
        if (base.base === "-") {
          className.push("!bg-noir-900 text-red-400"); // we want to override the selection background color
        } else {
          className.push("!bg-red-500 text-white"); // we want to override the selection background color
        }
      } else {
        className.push("text-emerald-300");
      }
    }
    return className.join(" ");
  };

  return (
    <div className="grid h-screen content-center">
      <Card className="max-w-xl">
        <HeadTailViewer
          sequences={annotatedSequences}
          abData={abData}
          selection={null}
          alignmentOffset={0}
          charClassName={charClassName}
        />
      </Card>
    </div>
  );
};
