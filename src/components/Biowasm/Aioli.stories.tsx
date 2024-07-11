import { Card } from "@ui/Card";
import { Minimap } from "./Minimap";
import { Samtools } from "./Samtools";

export default {
  title: "Biowasm/Aioli",
};

export const _Samtools = () => {
  return (
    <Card className="max-w-3xl">
      <Samtools />
    </Card>
  );
};

export const _Minimap = () => {
  return (
    <Card className="max-w-3xl">
      <Minimap />
    </Card>
  );
};
