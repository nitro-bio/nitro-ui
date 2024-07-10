import { useState } from "react";
import { FileUpload } from "..";
import { useMinimap } from "./hooks";
export const Minimap = () => {
  const [files, setFiles] = useState<File[] | null>(null);
  const pushFiles = (f: File[]) => {
    setFiles((prev) => (prev ? [...prev, ...f] : f));
  };
  const { loaded, output, mounted } = useMinimap({ files });
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
  if (output.length === 0) {
    return <div>No output</div>;
  }
  return <div className="whitespace-pre font-mono">{output}</div>;
};
