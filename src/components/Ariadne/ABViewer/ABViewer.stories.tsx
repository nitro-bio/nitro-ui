import { ValidatedSequence } from "@Ariadne/types";
import { getAnnotatedSequence } from "@Ariadne/utils";
import { Card } from "@ui/Card";
import { useMemo } from "react";

import { ABViewer } from ".";
import { getABData } from "./ABViewer";

export default {
  title: "Ariadne/ABViewer",
  component: ABViewer,
  argTypes: {
    sequence: { type: "string" },
  },
};

export const Default = () => {
  const sequence =
    "ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG";
  const validatedSequence = sequence.split("") as ValidatedSequence;
  const annotatedSequence = getAnnotatedSequence(validatedSequence, []);
  const data = useMemo(() => getABData(sequence), [sequence]);
  return (
    <div className="grid h-screen content-center">
      <Card className="max-w-xl">
        <ABViewer data={data} sequence={annotatedSequence} />
      </Card>
    </div>
  );
};
