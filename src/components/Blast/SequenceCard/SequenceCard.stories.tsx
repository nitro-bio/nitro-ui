import { SequenceCard } from "./SequenceCard";

export default {
  title: "Blast/SequenceCard",
  component: SequenceCard,
  argTypes: {
    sequence: { type: "string" },
    sequenceName: { type: "string" },
  },
};

export const SequenceCardStory = () => {
  const sequence = "ATGCTG";
  const sequenceName = "test";
  return (
    <div className="max-w-xl">
      <SequenceCard sequenceName={sequenceName} sequence={sequence} />
    </div>
  );
};
