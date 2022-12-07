import { ComponentMeta, ComponentStory } from "@storybook/react";
import Card from "@ui/Card";
import { Gleipnir } from ".";

export default {
  title: "Gleipnir/Gleipnir",
  argTypes: {},
} as ComponentMeta<typeof Gleipnir>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = () => {
  return (
    <Card className="grid content-center px-8 py-6">
      <Gleipnir />
    </Card>
  );
};

export const DefaultStory = Template.bind({});
