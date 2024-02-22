import { LinearViewer } from "@Ariadne/LinearViewer";
import { Card } from "@ui/Card";
import { useStreamlitAriadne } from "./Ariadne";

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
      <Card className="w-full max-w-3xl">
        {ready ? (
          <>
            <LinearViewer
              containerClassName="text-brand-400 h-fit"
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
