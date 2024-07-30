import { useQuery } from "@tanstack/react-query";
import { useAioli, useMountFiles } from "../hooks";
import { parseMinimap2Output } from "./utils";

export const useMinimap = ({ files }: { files: File[] | null }) => {
  const { loaded, cli } = useAioli(["minimap2/2.22"]);
  const { mounted, paths } = useMountFiles({ files, cli });
  const queryFn = async () => {
    if (!mounted || !cli.current) throw new Error("CLI not ready");
    try {
      const raw: string = await cli.current.exec(
        `minimap2 -a ${paths.join(" ")}`,
      );
      console.log("raw", raw);
      return parseMinimap2Output(raw);
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const { data, isFetching, error } = useQuery({
    queryKey: ["minimap2", files],
    queryFn,
    enabled: loaded && mounted && files !== null,
  });

  return {
    minimapOutput: data,
    isFetchingMinimapOutput: isFetching,
    minimapOutputError: error as Error | null,
    loaded,
    mounted,
  };
};
