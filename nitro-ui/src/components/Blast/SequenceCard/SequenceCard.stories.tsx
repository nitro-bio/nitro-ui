import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SequenceCard } from "./SequenceCard";

export default {
  title: "Blast/SequenceCard",
  component: SequenceCard,
  argTypes: {
    sequence: { type: "string" },
    sequenceName: { type: "string" },
  },
} as ComponentMeta<typeof SequenceCard>;

const Template: ComponentStory<any> = (args: {
  sequence: string;
  sequenceName: string;
}) => (
    <div className="max-w-xl">
      <SequenceCard sequenceName={args.sequenceName} sequence={args.sequence} />
    </div>
);

export const SequenceCardStory = Template.bind({});
SequenceCardStory.args = { sequence: "ATGCTG", sequenceName: "test" };
