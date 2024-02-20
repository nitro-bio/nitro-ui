import { generateRandomAnnotations } from "@Ariadne/storyUtils";
import { getAnnotatedSequence, getStackedAnnotations } from "@Ariadne/utils";
import { Card } from "@ui/Card";
import { useMemo, useState } from "react";

import type {
  AA,
  AnnotatedAA,
  AnnotatedNucl,
  AriadneSelection,
  Nucl,
} from "@Ariadne/types";
import { SequenceInput } from "@Ariadne/SequenceInput";

export default {
  title: "Ariadne/SequenceInput",
  component: SequenceInput,
};

export const SequenceStory = ({}) => {
  return (
    <Card>
      <SequenceInput />
    </Card>
  );
};
