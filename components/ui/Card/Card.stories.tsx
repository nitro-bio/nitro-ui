import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Card } from "./Card";

export default {
  title: "UI/Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const CardStory = Template.bind({});
CardStory.args = {
  children: (
    <>
      <div> Hello World</div>
      <div>Foo bar baz</div>
    </>
  ),
};
