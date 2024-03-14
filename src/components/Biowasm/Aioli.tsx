import { useEffect, useRef, useState } from "react";
import Aioli from "@biowasm/aioli";
import { FileUpload } from "..";
export const Samtools = () => {
  const [files, setFiles] = useState<File[] | null>(null);
  const { loaded, output, mounted } = useSamtools({ files });
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
          setFiles([new File([res.data], res.fileName)]);
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
  return (
    <div className="pre-whitespace font-mono">
      {JSON.stringify(output, null, 2)}
    </div>
  );
};

const useAioli = (packages: string[]) => {
  const [loaded, setLoaded] = useState(false);
  const cli = useRef<Aioli | null>(null);
  useEffect(
    function loadAioli() {
      const load = async () => {
        const CLI = await new Aioli(packages);
        cli.current = CLI;
        setLoaded(true);
      };
      load();
    },
    [packages],
  );

  return { loaded, cli };
};

const useSamtools = ({ files }: { files: File[] | null }) => {
  const { loaded, cli } = useAioli(["samtools/1.10"]);
  const [mounted, setMounted] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  useEffect(
    function mountFiles() {
      if (!files) {
        console.log("no files");
        return;
      }
      if (cli.current === null) {
        console.log("no cli");
        return;
      }
      setMounted(false);
      const mount = async () => {
        const _paths = await cli.current!.mount(files);
        setPaths(_paths);
        setMounted(true);
      };
      mount();
    },
    [files, cli.current],
  );

  useEffect(
    function runSamtools() {
      const run = async () => {
        if (!mounted) {
          return;
        }
        if (cli.current) {
          const result = await cli.current?.exec("samtools", [
            "view",
            "-h",
            paths[0], // just the first file for now
          ]);
          setOutput(result);
        }
      };
      run();
    },
    [paths],
  );
  return { loaded, mounted, output };
};
