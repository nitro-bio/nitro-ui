import { CircularViewer } from "@Ariadne/CircularViewer";
import { LinearViewer } from "@Ariadne/LinearViewer";
import { annotationSchema, ariadneSelectionSchema } from "@Ariadne/schemas";
import { AriadneSelection } from "@Ariadne/types";
import { useStreamlit } from "@Streamlit/hooks";
import { Card } from "@ui/Card";
import { useRef } from "react";
import { z } from "zod";

export const AriadneStreamlitSchema = z.object({
  sequences: z.array(z.string()),
  selection: ariadneSelectionSchema.nullable(),
  annotations: z.array(annotationSchema),
});

export const useStreamlitAriadne = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { data, setData, error } = useStreamlit({
    ref,
    zodSchema: AriadneStreamlitSchema,
    scrubUnclonable: true,
  });
  const setSelection = (selection: AriadneSelection | null) => {
    if (!data) return;
    setData({ ...data, selection });
  };
  const { sequences, annotations, selection } = data ?? {
    sequences: undefined,
    annotations: undefined,
    selection: undefined,
  };
  const classNameBySequenceIdx = ({ sequenceIdx }: { sequenceIdx: number }) => {
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
    error,
    sequences,
    annotations,
    selection,
    setSelection,
    classNameBySequenceIdx,
  };
};

export const CircularViewerStreamlit = () => {
  const { ref, sequences, annotations, selection, setSelection, error } =
    useStreamlitAriadne();

  const ready = sequences && annotations && selection !== undefined;
  return (
    <div className="grid h-screen content-center" ref={ref}>
      <Card className="max-w-xl">
        {ready ? (
          <CircularViewer
            containerClassName="text-brand-400"
            sequence={sequences[0]}
            annotations={annotations}
            selection={selection}
            setSelection={setSelection}
          />
        ) : (
          "Waiting for data from Streamlit..."
        )}
        {error && <div className="text-error">{error.message}</div>}
      </Card>
    </div>
  );
};

export const LinearViewerStreamlit = () => {
  const {
    ref,
    sequences,
    annotations,
    selection,
    setSelection,
    classNameBySequenceIdx,
  } = useStreamlitAriadne();

  const ready = sequences && annotations && selection !== undefined;
  return (
    <div className="grid h-screen content-center" ref={ref}>
      <Card className="h-fit px-8">
        {ready ? (
          <>
            <LinearViewer
              containerClassName="text-brand-400 mb-8"
              sequences={sequences}
              annotations={annotations}
              selection={selection}
              setSelection={setSelection}
              selectionClassName={() => "text-brand-400"}
              sequenceClassName={classNameBySequenceIdx}
            />
          </>
        ) : (
          "Waiting for data from Streamlit..."
        )}
      </Card>
    </div>
  );
};
