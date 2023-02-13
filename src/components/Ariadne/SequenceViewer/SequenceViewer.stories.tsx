import { generateRandomAnnotations } from "@Ariadne/storyUtils";
import { getAnnotatedSequence, getStackedAnnotations } from "@Ariadne/utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";
import { useMemo, useState } from "react";

import { SequenceViewer, CharType } from ".";
import type { AA, AriadneSelection, Nucl } from "../types";

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
  secondarySequence,
  initialSelection,
  containerClassName,
  charClassName,
}: {
  sequence: string;
  secondarySequence?: string;
  initialSelection?: AriadneSelection;
  containerClassName?: string;
  charClassName?: ({ char, type }: { char: string; type: CharType }) => string;
}) => {
  const annotations = useMemo(
    () => generateRandomAnnotations(sequence, 5),
    [sequence]
  );
  const stackedAnnotations = getStackedAnnotations(annotations);

  const validatedSequence = sequence.replace(/[^ACGT]/g, "").split("") as
    | Nucl[]
    | AA[];

  const annotatedSequence = getAnnotatedSequence(
    validatedSequence,
    stackedAnnotations
  );
  const [selection] = useState<AriadneSelection | null>(
    initialSelection ?? null
  );

  const secondaryAnnotatedSequence = useMemo(() => {
    if (!secondarySequence || secondarySequence.length === 0) {
      return undefined;
    }

    const secondaryValidatedSequence = secondarySequence
      .replace(/[^ACGT]/g, "")
      .split("") as Nucl[];
    const res = getAnnotatedSequence(secondaryValidatedSequence, []);
    return res;
  }, [secondarySequence]);

  return (
    <div className="grid h-screen content-center">
      <Card className="h-[400px] max-w-xl">
        <SequenceViewer
          selectionClassName="bg-brand-400"
          sequence={annotatedSequence}
          secondarySequence={secondaryAnnotatedSequence}
          selection={selection}
          charClassName={charClassName}
          containerClassName={containerClassName}
        />
      </Card>
    </div>
  );
};

export const SequenceViewerStory = Template.bind({});
SequenceViewerStory.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
};
export const SequenceViewerStoryForwardSelectionOverSeam = Template.bind({});
SequenceViewerStoryForwardSelectionOverSeam.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  initialSelection: {
    start: 10,
    end: 5,
    direction: "forward",
  },
};

export const SequenceViewerStoryReverseSelection = Template.bind({});
SequenceViewerStoryReverseSelection.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  initialSelection: {
    start: 10,
    end: 5,
    direction: "reverse",
  },
};

export const SequenceViewerStoryReverseSelectionOverSeam = Template.bind({});
SequenceViewerStoryReverseSelectionOverSeam.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  initialSelection: {
    start: 5,
    end: 10,
    direction: "reverse",
  },
};

export const SequenceViewerStoryCustomClassNames = Template.bind({});
SequenceViewerStoryCustomClassNames.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  containerClassName: "text-xl bg-noir-800 skew-y-3",
  charClassName: ({ char, type }: { char: string; type: CharType }) => {
    if (type == "sequence") {
      if (char == "A" || char == "T") {
        return "dark:text-emerald-300 text-emerald-600";
      } else {
        return "dark:text-amber-300 text-amber-600";
      }
    }
    if (type == "complement") {
      if (char == "A" || char == "T") {
        return "dark:text-sky-300 text-sky-600";
      } else {
        return "dark:text-fuchsia-300 text-fuchsia-600";
      }
    }
  },
};

export const SequenceViewerStorySecondSequence = Template.bind({});
SequenceViewerStorySecondSequence.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  secondarySequence:
    "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT",
  initialSelection: {
    start: 5,
    end: 10,
    direction: "reverse",
  },
};
