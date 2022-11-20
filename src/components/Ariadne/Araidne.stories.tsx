import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";

import CircularViewer from "./CircularViewer";
import LinearViewer from "./LinearViewer";
import SequenceViewer from "./SequenceViewer";
import { generateRandomAnnotations } from "./storyUtils";
import { AA, Annotation, Nucl } from "./types";
import { getAnnotatedSequence } from "./utils";

export default {
  title: "Ariadne/Ariadne",
  argTypes: {
    sequence: { type: "string" },
  },
} as ComponentMeta<typeof CircularViewer>;

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
    <Card className="grid grid-cols-1 my-10 grid-row-auto lg:grid-cols-2 lg:grid-rows-2 lg:h-screen content-center">
      <div className="row-span-2 shrink-0 grid content-center ">
        <CircularViewer
          sequence={annotatedSequence}
          size={400}
          annotations={annotations}
        />
      </div>
      <div className="row-span-1 shrink-0 grid content-center">
        <LinearViewer
          sequence={annotatedSequence}
          annotations={annotations}
          size={400}
        />
      </div>
      <div className="row-span-1 shrink-0 grid content-center">
        <SequenceViewer sequence={annotatedSequence} />
      </div>
    </Card>
  );
};

export const KitchenSink = Template.bind({});
KitchenSink.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
};
