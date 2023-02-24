import { generateRandomSequences } from "@Ariadne/storyUtils";
import {
  Annotation,
  AnnotationType,
  AriadneSelection,
  StackedAnnotation,
} from "@Ariadne/types";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";
import { useMemo, useState } from "react";

import { LinearViewer } from ".";
import { LinearAnnotationGutter } from "./LinearAnnotationGutter";

export default {
  title: "Ariadne/LinearViewer",
  component: LinearViewer,
  argTypes: {
    sequences: { type: "string" },
  },
} as ComponentMeta<typeof LinearViewer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = ({
  initialSelection,
  selectionClassName,
}: {
  sequences: string[];
  initialSelection?: AriadneSelection;
  selectionClassName?: (selection: AriadneSelection) => string;
  customStackFn?: (annotations: Annotation[]) => StackedAnnotation[];
}) => {
  const { annotatedSequences, stackedAnnotations } = useMemo(
    () => generateRandomSequences({ maxLength: 100, maxSequences: 6 }),
    []
  );
  const [selection, setSelection] = useState<AriadneSelection | null>(
    initialSelection ?? null
  );
  const classNameBySequenceIdx = (sequenceIdx: number) => {
    if (sequenceIdx === 0) {
      return "dark:text-brand-300 text-brand-600";
    } else if (sequenceIdx === 1) {
      return "dark:text-indigo-300 text-indigo-600";
    } else if (sequenceIdx === 2) {
      return "dark:text-amber-300 text-amber-600";
    } else {
      return "dark:text-brand-300/50 text-brand-600/50";
    }
  };

  return (
    <Card className="w-full max-w-3xl px-8">
      <LinearViewer
        containerClassName="text-brand-400 "
        sequences={annotatedSequences}
        annotations={stackedAnnotations}
        selection={selection}
        setSelection={setSelection}
        selectionClassName={selectionClassName}
        cursorClassName="text-blue-200"
        sequenceClassName={classNameBySequenceIdx}
      />

      <LinearAnnotationGutter
        containerClassName=""
        stackedAnnotations={[]}
        sequence={annotatedSequences[0]}
      />
    </Card>
  );
};

export const LinearViewerStory = Template.bind({});
LinearViewerStory.args = {};
export const LinearViewerStoryForwardSelectionOverSeam = Template.bind({});
LinearViewerStoryForwardSelectionOverSeam.args = {
  initialSelection: {
    start: 10,
    end: 5,
    direction: "forward",
  },
};

export const LinearViewerStoryReverseSelection = Template.bind({});
LinearViewerStoryReverseSelection.args = {
  initialSelection: {
    start: 10,
    end: 5,
    direction: "reverse",
  },
};

export const LinearViewerStoryReverseSelectionOverSeam = Template.bind({});
LinearViewerStoryReverseSelectionOverSeam.args = {
  initialSelection: {
    start: 5,
    end: 10,
    direction: "reverse",
  },
};

export const LinearViewerStorySelectionClassName = Template.bind({});
LinearViewerStorySelectionClassName.args = {
  initialSelection: {
    start: 5,
    end: 10,
    direction: "reverse",
  },
  selectionClassName: (selection: AriadneSelection) => {
    if (Math.abs(selection.end - selection.start) > 100) {
      return "bg-red-500 fill-red-500 text-red-500";
    } else {
      return "bg-blue-500 fill-blue-500 text-blue-500";
    }
  },
};
