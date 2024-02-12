import { generateRandomSequences } from "@Ariadne/storyUtils";
import { AriadneSelection } from "@Ariadne/types";
import { Card } from "@ui/Card";
import { useEffect, useRef } from "react";
import { useStreamlitMock } from "@hooks/useStreamlit";
import { z } from "zod";
import { CircularViewer } from "@Ariadne/CircularViewer";
import {
  annotatedSequenceSchema,
  ariadneSelectionSchema,
  stackedAnnotationSchema,
} from "@Ariadne/schemas";
import { useStreamlit } from "@hooks/useStreamlit";

export default {
  title: "Streamlit/CircularViewer",
  component: CircularViewer,
};

const AriadneSchema = z.object({
  sequence: annotatedSequenceSchema,
  selection: ariadneSelectionSchema.nullable(),
  stackedAnnotations: z.array(stackedAnnotationSchema),
});

const useStreamlitAriadne = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { data, setData } = useStreamlit({
    ref,
    zodSchema: AriadneSchema,
    scrubUnclonable: true,
  });
  const setSelection = (selection: AriadneSelection | null) => {
    if (!data) return;
    setData({ ...data, selection });
  };
  const { sequence, stackedAnnotations, selection } = data ?? {
    sequence: undefined,
    stackedAnnotations: undefined,
    selection: undefined,
  };

  return { ref, sequence, stackedAnnotations, selection, setSelection };
};

export const CircularViewerStreamlit = () => {
  const { ref, sequence, stackedAnnotations, selection, setSelection } =
    useStreamlitAriadne();

  const { sendToReact } = useStreamlitMock({
    zodSchema: AriadneSchema,
    scrubUnclonable: true,
  });

  useEffect(function initializeStreamlitData() {
    const selection = null;
    const { annotatedSequences, stackedAnnotations } = generateRandomSequences({
      maxSequences: 1,
      maxLength: 1000,
    });
    sendToReact({
      sequence: annotatedSequences[0],
      stackedAnnotations,
      selection,
    });
  }, []);

  const ready = sequence && stackedAnnotations && selection !== undefined;
  return (
    <div className="grid h-screen content-center" ref={ref}>
      <Card className="max-w-xl">
        {ready ? (
          <CircularViewer
            containerClassName="text-brand-400"
            sequence={sequence}
            stackedAnnotations={stackedAnnotations}
            selection={selection}
            setSelection={setSelection}
          />
        ) : (
          "Waiting for data from Streamlit..."
        )}
      </Card>
    </div>
  );
};
