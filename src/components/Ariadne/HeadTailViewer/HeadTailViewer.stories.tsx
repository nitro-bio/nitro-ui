import { AnnotatedBase } from "@Ariadne/types";
import { Card } from "@ui/Card";

import { getABData } from "@Ariadne/ABViewer/ABViewer";
import { useMemo } from "react";
import { HeadTailViewer } from ".";
import { exampleSequences } from "./storyUtils";
import { getAnnotatedSequence } from "@Ariadne/utils";

export default {
  title: "Ariadne/HeadTailViewer",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Default = () => {
  const abData = useMemo(
    () => getABData(exampleSequences[0]),
    [exampleSequences],
  );

  const annotatedSequences = useMemo(
    function memoize() {
      return exampleSequences.map((sequence) =>
        getAnnotatedSequence({ sequence, stackedAnnotations: [] }),
      );
    },
    [exampleSequences],
  );

  const charClassName = ({
    base,
    sequenceIdx,
  }: {
    sequenceIdx: number;
    base: AnnotatedBase;
  }): string => {
    const className = [""];
    if (sequenceIdx == 0) {
      if ((base.index + 1) % 10 === 0) {
        className.push("underline");
      }

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
      const seqBase = annotatedSequences[1].find((b: AnnotatedBase) => {
        return b.index === base.index;
      });
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
          sequences={exampleSequences}
          abData={abData}
          selection={null}
          alignmentOffset={0}
          charClassName={charClassName}
        />
      </Card>
    </div>
  );
};
