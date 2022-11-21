import { generateRandomAnnotations } from "@Ariadne/storyUtils";
import { AriadneSelection, ValidatedSequence } from "@Ariadne/types";
import { getAnnotatedSequence } from "@Ariadne/utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";
import { useMemo, useState } from "react";

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
  const annotations = useMemo(
    () => generateRandomAnnotations(sequence, 5),
    [sequence]
  );
  const validatedSequence = sequence
    .replace(/[^ACGT]/g, "")
    .split("") as ValidatedSequence;
  const annotatedSequence = getAnnotatedSequence(
    validatedSequence,
    annotations
  );
  const [selection, setSelection] = useState<AriadneSelection>([null, null]);

  return (
    <Card className="max-w-xl">
      <LinearViewer
        sequence={annotatedSequence}
        annotations={annotations}
        selection={selection}
        setSelection={setSelection}
      />
    </Card>
  );
};

export const LinearViewerStory = Template.bind({});
LinearViewerStory.args = {
  sequence: "ATGATGATATGATGATATGATGATATGATGATATGATGATATGATGATATGATGATATGATGAT",
};
