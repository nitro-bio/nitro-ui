import { generateRandomAnnotations } from "@Ariadne/storyUtils";
import { ValidatedSequence } from "@Ariadne/types";
import { getAnnotatedSequence } from "@Ariadne/utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";

import LinearViewer from ".";

export default {
  title: "Ariadne/LinearViewer",
  component: LinearViewer,
  argTypes: {
    sequence: { type: "string" },
  },
} as ComponentMeta<typeof LinearViewer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = ({ sequence }: { sequence: string }) => {
  const annotations = generateRandomAnnotations(sequence, 10);
  const validatedSequence = sequence
    .replace(/[^ACGT]/g, "")
    .split("") as ValidatedSequence;
  const annotatedSequence = getAnnotatedSequence(
    validatedSequence,
    annotations
  );
  return (
    <Card className="max-w-xl">
      <LinearViewer sequence={annotatedSequence} annotations={annotations} />
    </Card>
  );
};

export const LinearViewerStory = Template.bind({});
LinearViewerStory.args = {
  sequence: "ATGATGATATGATGATATGATGATATGATGATATGATGATATGATGATATGATGATATGATGAT",
};
