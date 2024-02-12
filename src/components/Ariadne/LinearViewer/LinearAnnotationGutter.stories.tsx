import { generateRandomSequences } from "@Ariadne/storyUtils";
import { Card } from "@ui/Card";
import { useMemo } from "react";

import { LinearAnnotationGutter } from "./LinearAnnotationGutter";

export default {
  title: "Ariadne/LinearAnnotationGutter",
  component: LinearAnnotationGutter,
  argTypes: {
    sequences: { type: "string" },
  },
};

const LinearStory = () => {
  const { annotatedSequences, stackedAnnotations } = useMemo(
    () =>
      generateRandomSequences({
        maxSequences: 5,
        maxLength: 100,
      }),
    [],
  );

  return (
    <Card className="w-full max-w-3xl px-8">
      <LinearAnnotationGutter
        containerClassName=""
        stackedAnnotations={stackedAnnotations}
        sequence={annotatedSequences[0]}
      />
    </Card>
  );
};

export const LinearViewerStory = () => {
  return <LinearStory />;
};
