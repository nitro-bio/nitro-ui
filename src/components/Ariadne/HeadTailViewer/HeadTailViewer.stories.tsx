import { getABData } from "@Ariadne/ABViewer/ABViewer";
import { AnnotatedAA, AnnotatedNucl } from "@Ariadne/types";
import { Card } from "@ui/Card";
import { useMemo } from "react";

import { HeadTailViewer } from ".";
import { annotatedSequences } from "./storyUtils";

export default {
  title: "Ariadne/HeadTailViewer",
  component: HeadTailViewer,
  argTypes: {
    sequence: { type: "string" },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Default = () => {
  const abData = useMemo(
    () => getABData(annotatedSequences[0].map((b) => b.base).join("")),
    [annotatedSequences],
  );
  const charClassName = ({
    base,
    sequenceIdx,
  }: {
    sequenceIdx: number;
    base: AnnotatedNucl | AnnotatedAA;
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
      const seqBase = annotatedSequences[1].find(
        (b: AnnotatedAA | AnnotatedNucl) => {
          return b.index === base.index;
        },
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
