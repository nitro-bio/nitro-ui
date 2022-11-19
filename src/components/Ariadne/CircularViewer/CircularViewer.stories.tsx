import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";

import { CircularViewer } from "./CircularViewer";

export default {
  title: "Ariadne/CircularViewer",
  component: CircularViewer,
  argTypes: {
    sequence: { type: "string" },
  },
} as ComponentMeta<typeof CircularViewer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = ({ sequence }: { sequence: string }) => {
  return (
    <Card className="max-w-xl">
      <CircularViewer sequence={sequence} size={400} />
    </Card>
  );
};

export const CircularViewerStory = Template.bind({});
CircularViewerStory.args = {
  sequence: "ATGATGAT",
};
