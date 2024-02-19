import {
  annotatedSequenceSchema,
  ariadneSelectionSchema,
  stackedAnnotationSchema,
} from "@Ariadne/schemas";
import { AriadneSelection } from "@Ariadne/types";
import { CircularViewer } from "@Ariadne/CircularViewer";
import { Card } from "@ui/Card";
import { useRef } from "react";
import { z } from "zod";
import { useStreamlit } from "@Streamlit/hooks";
import { LinearAnnotationGutter, LinearViewer } from "@Ariadne/LinearViewer";

export const AriadneStreamlitSchema = z.object({
  sequences: z.array(annotatedSequenceSchema),
  selection: ariadneSelectionSchema.nullable(),
  stackedAnnotations: z.array(stackedAnnotationSchema),
});

export const useStreamlitAriadne = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { data, setData } = useStreamlit({
    ref,
    zodSchema: AriadneStreamlitSchema,
    scrubUnclonable: true,
  });
  const setSelection = (selection: AriadneSelection | null) => {
    if (!data) return;
    setData({ ...data, selection });
  };
  const { sequences, stackedAnnotations, selection } = data ?? {
    sequences: undefined,
    stackedAnnotations: undefined,
    selection: undefined,
  };
  const classNameBySequenceIdx = (sequenceIdx: number) => {
    if (sequenceIdx === 0) {
      return "dark:text-brand-300 text-brand-600";
    } else if (sequenceIdx === 1) {
      return "dark:text-indigo-300 text-indigo-600";
    } else if (sequenceIdx === 2) {
      return "dark:text-amber-300 text-amber-600";
    } else {
      return "dark:text-noir-300 text-noir-600";
    }
  };

  return {
    ref,
    sequences,
    stackedAnnotations,
    selection,
    setSelection,
    classNameBySequenceIdx,
  };
};

export const CircularViewerStreamlit = () => {
  const { ref, sequences, stackedAnnotations, selection, setSelection } =
    useStreamlitAriadne();

  const ready = sequences && stackedAnnotations && selection !== undefined;
  return (
    <div className="grid h-screen content-center" ref={ref}>
      <Card className="max-w-xl">
        {ready ? (
          <CircularViewer
            containerClassName="text-brand-400"
            sequence={sequences[0]}
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

export const LinearViewerStreamlit = () => {
  const {
    ref,
    sequences,
    stackedAnnotations,
    selection,
    setSelection,
    classNameBySequenceIdx,
  } = useStreamlitAriadne();

  const ready = sequences && stackedAnnotations && selection !== undefined;
  return (
    <div className="grid h-screen content-center" ref={ref}>
      <Card className="h-fit px-8">
        {ready ? (
          <>
            <LinearViewer
              containerClassName="text-brand-400 mb-8"
              sequences={sequences}
              annotations={stackedAnnotations}
              selection={selection}
              setSelection={setSelection}
              selectionClassName={() => "text-brand-400"}
              sequenceClassName={classNameBySequenceIdx}
            />
            <LinearAnnotationGutter
              containerClassName="flex-1"
              stackedAnnotations={stackedAnnotations}
              sequence={sequences[0]}
            />
          </>
        ) : (
          "Waiting for data from Streamlit..."
        )}
      </Card>
    </div>
  );
};
