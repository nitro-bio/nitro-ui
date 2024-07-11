import { useEffect, useRef, useState } from "react";
import Aioli from "@biowasm/aioli";
import { parseMinimap2Output } from "./utils";
import { MinimapOutput } from "./schemas";

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

const useMountFiles = ({
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

export const useMinimap = ({ files }: { files: File[] | null }) => {
  const { loaded, cli } = useAioli(["minimap2/2.22"]);
  const { mounted, paths } = useMountFiles({ files, cli });

  const [output, setOutput] = useState<MinimapOutput | null>(null);
  useEffect(
    function runMinimap() {
      const run = async () => {
        if (!mounted) {
          return;
        }
        if (cli.current) {
          const raw: string = await cli.current?.exec(
            `minimap2 -a ${paths[0]} ${paths[1]}`,
          );
          const parsed = parseMinimap2Output(raw);
          console.log(parsed);
          setOutput(parsed);
        }
      };
      run();
    },
    [paths],
  );
  return {
    loaded,
    mounted,
    minimapOutput: output,
  };
};
