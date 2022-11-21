import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";
import { useMemo, useState } from "react";

import CircularViewer from "./CircularViewer";
import LinearViewer from "./LinearViewer";
import SequenceViewer from "./SequenceViewer";
import { generateRandomAnnotations } from "./storyUtils";
import { AA, AriadneSelection, Nucl } from "./types";
import { getAnnotatedSequence } from "./utils";

export default {
  title: "Ariadne/Ariadne",
  argTypes: {
    sequence: { type: "string" },
  },
} as ComponentMeta<typeof CircularViewer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = ({ sequence }: { sequence: string }) => {
  const annotations = useMemo(
    () => generateRandomAnnotations(sequence, 5),
    [sequence]
  );
  const validatedSequence = sequence.replace(/[^ACGT]/g, "").split("") as
    | Nucl[]
    | AA[];

  const annotatedSequence = getAnnotatedSequence(
    validatedSequence,
    annotations
  );
  const [selection, setSelection] = useState<AriadneSelection>([null, null]);
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
          selection={selection}
          setSelection={setSelection}
        />
      </div>
      <div className="row-span-1 grid shrink-0 content-center ">
        <LinearViewer
          sequence={annotatedSequence}
          annotations={annotations}
          selection={selection}
          setSelection={setSelection}
        />
      </div>
    </Card>
  );
};

export const KitchenSink = Template.bind({});
KitchenSink.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
};
