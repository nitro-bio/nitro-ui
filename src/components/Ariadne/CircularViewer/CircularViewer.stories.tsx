import { generateRandomAnnotations } from "@Ariadne/storyUtils";
import { Annotation, ValidatedSequence } from "@Ariadne/types";
import { getAnnotatedSequence } from "@Ariadne/utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";

import CircularViewer from ".";
import { Props } from "./CircularViewer";

export default {
  title: "Ariadne/CircularViewer",
  component: CircularViewer,
  argTypes: {
    sequence: { type: "string" },
  },
} as ComponentMeta<typeof CircularViewer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = ({ sequence }: { sequence: string }) => {
  const annotations = generateRandomAnnotations(sequence, 5);
  const validatedSequence = sequence.split("") as ValidatedSequence;
  const annotatedSequence = getAnnotatedSequence(
    validatedSequence,
    annotations
  );
  return (
    <Card className="max-w-xl">
      <CircularViewer
        sequence={annotatedSequence}
        size={400}
        annotations={annotations}
      />
    </Card>
  );
};

export const CircularViewerStory = Template.bind({});
CircularViewerStory.args = {
  sequence: "abcdefghijklmnopqrstuvwxyz",
};
