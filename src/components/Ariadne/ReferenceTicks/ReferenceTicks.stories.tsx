import { ValidatedSequence } from "@Ariadne/types";
import { getAnnotatedSequence } from "@Ariadne/utils";
import { Card } from "@ui/Card";

import { ReferenceTicks } from ".";

export default {
  title: "Ariadne/ReferenceTicks",
  component: ReferenceTicks,
  argTypes: {
    sequence: { type: "string" },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Default = () => {
  const sequence =
    "ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG";
  const validatedSequence = sequence.split("") as ValidatedSequence;
  const annotatedSequence = getAnnotatedSequence(validatedSequence, []);
  return (
    <div className="grid h-screen content-center">
      <Card className="max-w-xl">
        <ReferenceTicks sequence={annotatedSequence} />
      </Card>
    </div>
  );
};
