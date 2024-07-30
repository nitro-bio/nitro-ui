import { useMemo } from "react";
import { useAioli, useMountFiles } from "../hooks";
import { parseMinimap2Output } from "./utils";

export const useMinimap = ({ sequences }: { sequences: string[] }) => {
  const { loaded, cli } = useAioli(["minimap2/2.22"]);

  const files = useMemo(
    () =>
      sequences.map((seq, idx) => ({
        name: `seq${idx}.fasta`,
        data: seqToFasta(seq, idx),
      })),
    [sequences],
  );
  const { mounted, paths } = useMountFiles({
    files: files,
    cli,
  });
  console.log("Paths:", paths);

  const runMinimap = async () => {
    const ready = loaded && mounted && cli.current;
    if (!ready) {
      throw new Error("CLI not ready");
    }
    console.log(`Running minimap2 on files: ${paths}`);

    try {
      const raw: string = await cli.current!.exec(
        `minimap2 -a ${paths.join(" ")}`,
      );
      console.log("Minimap2 output:", raw);
      return parseMinimap2Output(raw);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  return {
    runMinimap,
    loaded,
    mounted,
  };
};

const seqToFasta = (seq: string, idx: number) => {
  const res = `>seq${idx}\n${seq}`;

  return res;
};
