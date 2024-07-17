import { useState } from "react";
import { AriadneSelection, LinearViewer, SequenceViewer } from "@Ariadne/index";
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

  if (endpoint && !loaded) {
    return <div>Loading...</div>;
  }
  if (!endpoint && !mounted) {
    return <div>Mounting files...</div>;
  }
  if (!minimapOutput) {
    return <div>No output</div>;
  }
  return <OutputViz minimapOutput={minimapOutput} />;
};

const OutputViz = ({ minimapOutput }: { minimapOutput: MinimapOutput }) => {
  const [selection, setSelection] = useState<AriadneSelection | null>(null);

  const generateMidline = (query: string, target: string) =>
    query
      .split("")
      .map((queryChar: string, i: number) => {
        const targetChar = target[i];
        if (targetChar === queryChar) {
          return "|";
        }
        return "X";
      })
      .join("");
  const charClassName = ({
    base,
    sequenceIdx,
  }: {
    base: { base: string };
    sequenceIdx: number;
  }) => {
    if (sequenceIdx === 0) {
      return "text-brand-400";
    }
    if (sequenceIdx === 1) {
      if (base.base === "|") {
        return "text-brand-400";
      }
      if (base.base === "X") {
        return "text-red-400";
      }
    }
    if (sequenceIdx === 2) {
      return "text-brand-400";
    }
  };
  return (
    <div className="whitespace-pre font-mono">
      <LinearViewer
        sequences={[
          minimapOutput.alignments[0].aligned_sequences.query.slice(550),
          minimapOutput.alignments[0].aligned_sequences.ref.slice(550),
        ]}
        annotations={[]}
        selection={selection}
        setSelection={setSelection}
        sequenceClassName={() => "text-brand-400"}
        mismatchClassName={() => "stroke-red-500 w-px"}
      />
      <SequenceViewer
        sequences={[
          minimapOutput.alignments[0].aligned_sequences.query.slice(550),
          generateMidline(
            minimapOutput.alignments[0].aligned_sequences.query.slice(550),
            minimapOutput.alignments[0].aligned_sequences.ref.slice(550),
          ),
          minimapOutput.alignments[0].aligned_sequences.ref.slice(550),
        ]}
        annotations={[]}
        selection={selection}
        charClassName={charClassName}
        selectionClassName="bg-brand-200/20"
      />
    </div>
  );
};
