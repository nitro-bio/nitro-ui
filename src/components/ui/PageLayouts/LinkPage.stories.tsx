import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LinkPage } from "./LinkPage";

export default {
  title: "UI/LinkPage",
  component: LinkPage,
} as ComponentMeta<typeof LinkPage>;

const sampleText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam";

const cards = [
  { title: "Link a", description: sampleText, href: "#" },
  { title: "Link b", description: sampleText, href: "#" },
  { title: "Link c", description: sampleText, href: "#" },
];

const Template: ComponentStory<typeof LinkPage> = () => {
  return (
    <LinkPage
      cards={cards}
      title={"About Me"}
      subtitle={"Some things about me."}
    />
  );
};

export const LinkPageStory = Template.bind({});
