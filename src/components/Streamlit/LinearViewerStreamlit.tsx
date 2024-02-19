import { Card } from "@ui/Card";
import { LinearAnnotationGutter, LinearViewer } from "@Ariadne/LinearViewer";
import { useStreamlitAriadne } from "./Ariadne";

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
      <Card className="w-full max-w-3xl">
        {ready ? (
          <>
            <LinearViewer
              containerClassName="text-brand-400 h-fit"
              sequences={sequences}
              annotations={stackedAnnotations}
              selection={selection}
              setSelection={setSelection}
              selectionClassName={() => "text-brand-400"}
              sequenceClassName={classNameBySequenceIdx}
            />

            <LinearAnnotationGutter
              containerClassName="h-fit"
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
