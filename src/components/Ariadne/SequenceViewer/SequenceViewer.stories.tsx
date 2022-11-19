import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";

import SequenceViewer from ".";
import type { Annotation, ValidatedSequence } from "../types";

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
  return (
    <Card className="max-w-xl h-[300px]">
      <SequenceViewer
        sequence={sequence.split("") as ValidatedSequence}
        size={{ width: 500, height: 500 }}
        annotations={annotations}
      />
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
      color: "bg-red-300",
      text: "test",
      onClick: () => console.log("clicked"),
    },
    {
      start: 3,
      end: 16,
      color: "bg-green-300",
      text: "test",
      onClick: () => console.log("clicked"),
    },
    {
      start: 20,
      end: 24,
      color: "bg-blue-300",
      text: "test",
      onClick: () => console.log("clicked"),
    },
  ],
};
