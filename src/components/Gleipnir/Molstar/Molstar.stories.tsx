import { Card } from "@ui/Card";

import { Molstar } from "./Molstar";

export default {
  title: "Gleipnir/Molstar",
  component: Molstar,
  argTypes: {
    query: { type: "string" },
  },
};

export const MolstarStory = () => (
  <Card className="h-[400px] w-[400px]">
    <Molstar pdbId="1LOL" />
  </Card>
);
