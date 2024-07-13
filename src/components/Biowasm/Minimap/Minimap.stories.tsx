import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Minimap } from "./Minimap";
import { Card } from "@ui/Card";

export default {
  title: "Biowasm/Minimap",
};

export const MinimapInternal = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Card className="max-w-3xl">
        <Minimap />
      </Card>
    </QueryClientProvider>
  );
};
export const MinimapExternal = () => {
  return (
    <QueryClientProvider
      client={
        new QueryClient({ defaultOptions: { queries: { retry: false } } })
      }
    >
      <Card className="max-w-3xl">
        <Minimap endpoint="http://localhost:8000/api/minimap2" />
      </Card>
    </QueryClientProvider>
  );
};
