import { generateRandomAnnotations } from "@Ariadne/storyUtils";
import {
  Annotation,
  AnnotationType,
  AriadneSelection,
  StackedAnnotation,
  ValidatedSequence,
} from "@Ariadne/types";
import { getAnnotatedSequence, getStackedAnnotations } from "@Ariadne/utils";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";
import { useMemo, useState } from "react";

import { LinearViewer } from ".";
import { LinearAnnotationGutter } from "./LinearAnnotationGutter";

export default {
  title: "Ariadne/LinearViewer",
  component: LinearViewer,
  argTypes: {
    sequence: { type: "string" },
  },
} as ComponentMeta<typeof LinearViewer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = ({
  sequence,
  initialSelection,
  selectionClassName,
  customStackFn,
}: {
  sequence: string;

  initialSelection?: AriadneSelection;
  selectionClassName?: (selection: AriadneSelection) => string;
  customStackFn?: (annotations: Annotation[]) => StackedAnnotation[];
}) => {
  const annotations = useMemo(
    () => generateRandomAnnotations(sequence, 5),
    [sequence]
  ).map((annotation: Annotation) => ({
    ...annotation,
    onClick: (ann: Annotation) => {
      setSelection(ann);
    },
  }));
  const stackFn = customStackFn ? customStackFn : getStackedAnnotations;
  const stackedAnnotations = stackFn(annotations);

  const validatedSequence = sequence
    .replace(/[^ACGT]/g, "")
    .split("") as ValidatedSequence;
  const annotatedSequence = getAnnotatedSequence(
    validatedSequence,
    stackedAnnotations
  );
  const [selection, setSelection] = useState<AriadneSelection | null>(
    initialSelection ?? null
  );

  return (
    <Card className="w-full max-w-3xl px-8">
      <LinearViewer
        containerClassName="text-brand-400 "
        sequence={annotatedSequence}
        annotations={stackedAnnotations}
        selection={selection}
        setSelection={setSelection}
        selectionClassName={selectionClassName}
        cursorClassName="text-blue-200"
      />

      <LinearAnnotationGutter
        containerClassName=""
        stackedAnnotations={stackedAnnotations}
        sequence={annotatedSequence}
      />
    </Card>
  );
};

export const LinearViewerStory = Template.bind({});
LinearViewerStory.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
};
export const LinearViewerStoryForwardSelectionOverSeam = Template.bind({});
LinearViewerStoryForwardSelectionOverSeam.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  initialSelection: {
    start: 10,
    end: 5,
    direction: "forward",
  },
};

export const LinearViewerStoryReverseSelection = Template.bind({});
LinearViewerStoryReverseSelection.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  initialSelection: {
    start: 10,
    end: 5,
    direction: "reverse",
  },
};

export const LinearViewerStoryReverseSelectionOverSeam = Template.bind({});
LinearViewerStoryReverseSelectionOverSeam.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  initialSelection: {
    start: 5,
    end: 10,
    direction: "reverse",
  },
};

export const LinearViewerStorySelectionClassName = Template.bind({});
LinearViewerStorySelectionClassName.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
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

export const LinearViewerCustomStackFn = Template.bind({});
LinearViewerCustomStackFn.args = {
  sequence:
    "ATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGCATGC",
  customStackFn: (annotations: Annotation[]): StackedAnnotation[] => {
    // create a map of annotation type to list
    const annotationMap = annotations.reduce((acc, annotation) => {
      if (!acc[annotation.type]) {
        acc[annotation.type] = [];
      }
      acc[annotation.type].push(annotation);
      return acc;
    }, {} as { [key: AnnotationType]: Annotation[] });

    const stacks = Object.values(annotationMap)
      .map((stack, stackIdx) => {
        return stack.map((annotation: Annotation) => {
          const res: StackedAnnotation = {
            ...annotation,
            stack: stackIdx,
          };
          return res;
        });
      })
      .flat();

    return stacks;
  },
};
