import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ListPage } from "./ListPage";

export default {
  title: "UILayout/ListPage",
  component: ListPage,
} as ComponentMeta<typeof ListPage>;

const sampleText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam";

const sections = [
  {
    name: "Development",
    entries: [
      { title: "Entry a", description: sampleText, href: "#" },
      { title: "Entry b", description: sampleText, href: "#" },
      { title: "Entry c", description: sampleText, href: "#" },
    ],
  },
  {
    name: "Projects",
    entries: [
      { title: "Entry d", description: sampleText, href: "#" },
      { title: "Entry e", description: sampleText, href: "#" },
      { title: "Entry f", description: sampleText, href: "#" },
    ],
  },
  {
    name: "Hobbies",
    entries: [
      { title: "Entry g", description: sampleText, href: "#" },
      { title: "Entry h", description: sampleText, href: "#" },
      { title: "Entry i", description: sampleText, href: "#" },
      { title: "Entry j", description: sampleText, href: "#" },
    ],
  },
];

const Template: ComponentStory<typeof ListPage> = () => {
  return (
    <ListPage
      sections={sections}
      title={"About Me"}
      subtitle={"Some things about me."}
    />
  );
};

export const ListPageStory = Template.bind({});
