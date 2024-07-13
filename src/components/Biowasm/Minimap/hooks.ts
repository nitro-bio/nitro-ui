import { useState } from "react";
import { useAioli, useMountFiles } from "../hooks";
import { w } from "@utils/wretch";
import { MinimapOutputSchema } from "./schemas";
import { parseMinimap2Output } from "./utils";
import { useQuery } from "@tanstack/react-query";

export const useMinimap = ({
  files,
  endpoint,
}: {
  files: File[] | null;
  endpoint?: string;
}) => {
  const [localLoading, setLocalLoading] = useState(false);
  const { loaded, cli } = useAioli(["minimap2/2.22"]);
  const { mounted, paths } = useMountFiles({ files, cli });

  const queryFn = async () => {
    if (endpoint) {
      console.log(`Minimap request using endpoint: ${endpoint}`);
      const raw = await w
        .url(endpoint)
        .formData({ ...files })
        .post()
        .json();
      return MinimapOutputSchema.parse(raw);
    } else {
      console.log(`Minimap request using CLI`);
      if (!mounted || !cli.current) throw new Error("CLI not ready");
      setLocalLoading(true);
      const raw: string = await cli.current.exec(
        `minimap2 -a ${paths[0]} ${paths[1]}`,
      );
      setLocalLoading(false);
      return parseMinimap2Output(raw);
    }
  };

  const { data, isFetching, error } = useQuery({
    queryKey: ["minimap2", files, endpoint],
    enabled: !!files,
    queryFn,
  });

  return {
    minimapOutput: data,
    isFetchingMinimapOutput: endpoint ? isFetching : localLoading,
    minimapOutputError: error as Error | null,
    loaded,
    mounted,
  };
};
