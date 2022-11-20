import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";

import CircularViewer from "./CircularViewer";
import LinearViewer from "./LinearViewer";
import SequenceViewer from "./SequenceViewer";
import { generateRandomAnnotations } from "./storyUtils";
import { AA, Nucl } from "./types";
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
    <Card className="grid-row-auto grid grid-cols-1 content-center lg:h-screen lg:grid-cols-2 lg:grid-rows-2">
      <div className="row-span-2 grid shrink-0 content-center  py-12">
        <SequenceViewer sequence={annotatedSequence} />
      </div>
      <div className="row-span-1 grid shrink-0 content-center ">
        <CircularViewer
          sequence={annotatedSequence}
          size={400}
          annotations={annotations}
        />
      </div>
      <div className="row-span-1 grid shrink-0 content-center ">
        <LinearViewer sequence={annotatedSequence} annotations={annotations} />
      </div>
    </Card>
  );
};

export const KitchenSink = Template.bind({});
KitchenSink.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
};
