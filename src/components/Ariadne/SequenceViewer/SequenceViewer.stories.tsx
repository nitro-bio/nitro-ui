import { getAnnotatedSequence } from "@Ariadne/utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";

import SequenceViewer from ".";
import type { Annotation } from "../types";

export default {
  title: "Ariadne/SequenceViewer",
  component: SequenceViewer,
  argTypes: {
    sequence: { type: "string" },
  },
} as ComponentMeta<typeof SequenceViewer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = ({
  sequence,
  annotations,
}: {
  sequence: string;
  annotations: Annotation[];
}) => {
  const annotatedSequence = getAnnotatedSequence(
    sequence.split(""),
    annotations
  );
  return (
    <Card className="max-w-xl h-[300px]">
      <SequenceViewer sequence={annotatedSequence} />
    </Card>
  );
};

export const SequenceViewerStory = Template.bind({});
SequenceViewerStory.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  annotations: [
    {
      start: 0,
      end: 4,
      color: "red-300",
      text: "test",
      onClick: () => console.log("clicked"),
    },
    {
      start: 3,
      end: 16,
      color: "green-300",
      text: "test",
      onClick: () => console.log("clicked"),
    },
    {
      start: 20,
      end: 24,
      color: "blue-300",
      text: "test",
      onClick: () => console.log("clicked"),
    },
  ],
};
