import { generateRandomAnnotations } from "@Ariadne/storyUtils";
import { AriadneSelection, ValidatedSequence } from "@Ariadne/types";
import { getAnnotatedSequence } from "@Ariadne/utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";
import { useMemo, useState } from "react";

import CircularViewer from ".";

export default {
  title: "Ariadne/CircularViewer",
  component: CircularViewer,
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
  const validatedSequence = sequence.split("") as ValidatedSequence;
  const annotatedSequence = getAnnotatedSequence(
    validatedSequence,
    annotations
  );
  const [selection, setSelection] = useState<AriadneSelection>([null, null]);
  return (
    <Card className="max-w-xl">
      <CircularViewer
        sequence={annotatedSequence}
        size={400}
        annotations={annotations}
        selection={selection}
        setSelection={setSelection}
      />
    </Card>
  );
};

export const CircularViewerStory = Template.bind({});
CircularViewerStory.args = {
  sequence: "abcdefghijklmnopqrstuvwxyz",
};
