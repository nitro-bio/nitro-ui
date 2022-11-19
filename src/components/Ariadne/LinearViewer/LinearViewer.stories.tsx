import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";

import LinearViewer from ".";

export default {
  title: "Ariadne/LinearViewer",
  component: LinearViewer,
  argTypes: {
    sequence: { type: "string" },
  },
} as ComponentMeta<typeof LinearViewer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = ({ sequence }: { sequence: string }) => {
  return (
    <Card className="max-w-xl">
      <LinearViewer sequence={sequence} size={400} />
    </Card>
  );
};

export const LinearViewerStory = Template.bind({});
LinearViewerStory.args = {
  sequence: "ATGATGAT",
};
