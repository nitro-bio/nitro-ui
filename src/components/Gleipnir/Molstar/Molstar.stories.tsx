import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";

import Molstar from "./Molstar";

export default {
  title: "Gleipnir/Molstar",
  component: Molstar,
  argTypes: {
    query: { type: "string" },
  },
} as ComponentMeta<typeof Molstar>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = () => {
  return (
    <Card className="h-[400px] w-[400px]">
      <Molstar pdbId="1LOL" />
    </Card>
  );
};

export const MolstarStory = Template.bind({});
