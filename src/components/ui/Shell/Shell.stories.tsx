import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Shell } from "./Shell";

export default {
  title: "UI/Shell",
  component: Shell,
} as ComponentMeta<typeof Shell>;

const sampleText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam";

const sections = [
  {
    name: "Development",
    cards: [{ title: "test", description: sampleText, href: "/" }],
  },
  {
    name: "Projects",
    cards: [{ title: "test", description: sampleText, href: "/" }],
  },
  {
    name: "Hobbies",
    cards: [{ title: "test", description: sampleText, href: "/" }],
  },
];

const Template: ComponentStory<typeof Shell> = () => {
  return (
    <Shell
      sections={sections}
      title={"About Me"}
      subtitle={"Some things about me."}
    />
  );
};

export const ShellStory = Template.bind({});
