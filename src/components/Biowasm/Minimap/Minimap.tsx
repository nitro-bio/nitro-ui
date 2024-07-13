import { useState } from "react";
import { AriadneSelection, LinearViewer } from "@Ariadne/index";
import { useMinimap } from "./hooks";
import { MinimapOutput } from "./schemas";
import { FileUpload } from "@ui/FileUpload";
export const Minimap = ({ endpoint }: { endpoint?: string }) => {
  const [files, setFiles] = useState<File[] | null>(null);
  const pushFiles = (f: File[]) => {
    setFiles((prev) => (prev ? [...prev, ...f] : f));
  };
  const { loaded, minimapOutput, mounted } = useMinimap({ files, endpoint });
  if (!files) {
    return (
      <FileUpload
        parseFile={async (f) => {
          const text = await f.text();
          return { fileName: f.name, success: true, data: text };
        }}
        upload={async (res: {
          fileName: string;
          success: true;
          data: string;
        }) => {
          pushFiles([new File([res.data], res.fileName)]);
        }}
      />
    );
  }

  if (!loaded) {
    return <div>Loading...</div>;
  }
  if (!mounted) {
    return <div>Mounting files...</div>;
  }
  if (!minimapOutput) {
    return <div>No output</div>;
  }
  return <OutputViz minimapOutput={minimapOutput} />;
};

const OutputViz = ({ minimapOutput }: { minimapOutput: MinimapOutput }) => {
  const [selection, setSelection] = useState<AriadneSelection | null>(null);
  return (
    <div className="whitespace-pre font-mono">
      <LinearViewer
        sequences={[
          minimapOutput.alignments[0].aligned_sequences.query,
          minimapOutput.alignments[0].aligned_sequences.ref,
        ]}
        annotations={[]}
        selection={selection}
        setSelection={setSelection}
        sequenceClassName={() => "text-brand-400"}
        mismatchClassName={() => "stroke-red-500 w-px"}
      />
    </div>
  );
};
