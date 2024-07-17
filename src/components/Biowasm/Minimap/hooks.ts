import { useQuery } from "@tanstack/react-query";
import { w } from "@utils/wretch";
import { useState } from "react";
import { useAioli, useMountFiles } from "../hooks";
import { parseMinimap2Output } from "./utils";

export const useMinimap = ({
  files,
  endpoint,
}: {
  files: [File, File] | null;
  endpoint?: string;
}) => {
  const [localLoading, setLocalLoading] = useState(false);
  const { loaded, cli } = useAioli(["minimap2/2.22"]);
  const { mounted, paths } = useMountFiles({ files, cli });

  const queryFn = async () => {
    if (endpoint && files) {
      console.log(`Minimap request using endpoint: ${endpoint}`);
      const raw: string = await w
        .url(endpoint)
        .formData({ first_file: files[0], second_file: files[1] })
        .post()
        .json();
      return parseMinimap2Output(raw);
    } else {
      console.log(`Minimap request using CLI`);
      if (!mounted || !cli.current) throw new Error("CLI not ready");
      setLocalLoading(true);
      try {
        const raw: string = await cli.current.exec(
          `minimap2 -a ${paths[0]} ${paths[1]}`,
        );
        setLocalLoading(false);
        console.log("raw", raw);
        return parseMinimap2Output(raw);
      } catch (e) {
        console.error(e);
        setLocalLoading(false);
        throw e;
      }
    }
  };

  const { data, isFetching, error } = useQuery({
    queryKey: ["minimap2", files, endpoint],
    queryFn,
    enabled: loaded && mounted && files !== null,
  });

  return {
    minimapOutput: data,
    isFetchingMinimapOutput: endpoint ? isFetching : localLoading,
    minimapOutputError: error as Error | null,
    loaded,
    mounted,
  };
};
