import { generateRandomAnnotations } from "@Ariadne/storyUtils";
import { getAnnotatedSequence } from "@Ariadne/utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";

import SequenceViewer from ".";
import type { AA, Annotation, Nucl } from "../types";

export default {
  title: "Ariadne/SequenceViewer",
  component: SequenceViewer,
  argTypes: {
    sequence: { type: "string" },
  },
} as ComponentMeta<typeof SequenceViewer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = ({ sequence }: { sequence: string }) => {
  const annotations = generateRandomAnnotations(sequence, 5);
  const validatedSequence = sequence.replace(/[^ACGT]/g, "").split("") as
    | Nucl[]
    | AA[];

  const annotatedSequence = getAnnotatedSequence(
    validatedSequence,
    annotations
  );

  return (
    <Card className="max-w-xl h-[400px]">
      <SequenceViewer sequence={annotatedSequence} />
    </Card>
  );
};

export const SequenceViewerStory = Template.bind({});
SequenceViewerStory.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
};
