import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";

import CircularViewer from ".";
import { Props } from "./CircularViewer";

export default {
  title: "Ariadne/CircularViewer",
  component: CircularViewer,
  argTypes: {
    sequence: { type: "string" },
  },
} as ComponentMeta<typeof CircularViewer>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = ({ sequence, annotations }: Props) => {
  return (
    <Card className="max-w-xl">
      <CircularViewer
        sequence={sequence}
        size={400}
        annotations={annotations}
      />
    </Card>
  );
};

export const CircularViewerStory = Template.bind({});
CircularViewerStory.args = {
  sequence: "abcdefghijklmnopqrstuvwxyz",
  annotations: [
    {
      start: 0,
      end: 4,
      color: "red",
      text: "test",
      onClick: () => console.log("clicked"),
    },
    {
      start: 3,
      end: 16,
      color: "green",
      text: "test",
      onClick: () => console.log("clicked"),
    },
    {
      start: 20,
      end: 24,
      color: "blue",
      text: "test",
      onClick: () => console.log("clicked"),
    },
  ],
};
