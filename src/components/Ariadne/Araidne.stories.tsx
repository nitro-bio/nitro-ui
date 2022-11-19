import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";

import CircularViewer from "./CircularViewer";
import LinearViewer from "./LinearViewer";
import SequenceViewer from "./SequenceViewer";
import { AA, Annotation, Nucl } from "./types";
import { getAnnotatedSequence } from "./utils";

export default {
  title: "Ariadne/Ariadne",
  argTypes: {
    sequence: { type: "string" },
  },
} as ComponentMeta<typeof CircularViewer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = ({
  sequence,
  annotations,
}: {
  sequence: string;
  annotations: Annotation[];
}) => {
  const validatedSequence = sequence.replace(/[^ACGT]/g, "").split("") as
    | Nucl[]
    | AA[];
  const annotatedSequence = getAnnotatedSequence(
    validatedSequence,
    annotations
  );
  return (
    <Card className="grid grid-cols-1 grid-row-auto lg:grid-cols-2 lg:grid-rows-2 lg:h-screen content-center">
      <div className="row-span-2 shrink-0 grid content-center bg-red-50">
        <SequenceViewer sequence={annotatedSequence} />
      </div>
      <div className="row-span-1 shrink-0 grid content-center bg-blue-50">
        <LinearViewer
          sequence={annotatedSequence}
          annotations={annotations}
          size={400}
        />
      </div>
      <div className="row-span-1 shrink-0 grid content-center bg-green-50">
        <CircularViewer
          sequence={annotatedSequence}
          size={400}
          annotations={annotations}
        />
      </div>
    </Card>
  );
};

export const KitchenSink = Template.bind({});
KitchenSink.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  annotations: [
    {
      start: 0,
      end: 4,
      color: "red",
      text: "test",
      onClick: () => console.log("clicked"),
    },
    {
      start: 3,
      end: 16,
      color: "green",
      text: "test",
      onClick: () => console.log("clicked"),
    },
    {
      start: 20,
      end: 24,
      color: "blue",
      text: "test",
      onClick: () => console.log("clicked"),
    },
  ],
};
