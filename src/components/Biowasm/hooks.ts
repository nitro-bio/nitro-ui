import Aioli from "@biowasm/aioli";
import { useEffect, useRef, useState } from "react";

export const useAioli = (packages: string[]) => {
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

export const useMountFiles = ({
  files,
  cli,
}: {
  files: File[] | null;
  cli: React.MutableRefObject<Aioli | null>;
}) => {
  const [mounted, setMounted] = useState(false);
  const [paths, setPaths] = useState<string[]>([]);
  useEffect(
    function mountFiles() {
      if (!files) {
        return;
      }
      if (cli.current === null) {
        return;
      }
      setMounted(false);
      const mount = async () => {
        const _paths = await cli.current!.mount(files);
        setPaths(_paths);
        console.log(_paths, "mounted");
        setMounted(true);
      };
      mount();
    },
    [files, cli.current],
  );

  return { mounted, paths };
};

export const useSamtools = ({ files }: { files: File[] | null }) => {
  const { loaded, cli } = useAioli(["samtools/1.10"]);
  const { mounted, paths } = useMountFiles({ files, cli });

  const [output, setOutput] = useState<string[]>([]);
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
            paths[0], // TODO: run for all files
          ]);
          // TODO: fix type hack
          setOutput(result as unknown as string[]);
        }
      };
      run();
    },
    [paths],
  );
  return { loaded, mounted, output };
};
