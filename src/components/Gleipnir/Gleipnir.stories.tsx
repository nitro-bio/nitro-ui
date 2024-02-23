import { Gleipnir } from ".";
import { GENES, PROTEINS, REACTIONS } from "./storyUtils";

export default {
  title: "Gleipnir/Gleipnir",
  argTypes: {},
};

export const DefaultStory = () => {
  return (
    <div className="flex h-screen items-center justify-center px-8 py-6 dark:bg-noir-700">
      <div className="max-w-7xl flex-1">
        <Gleipnir genes={GENES} proteins={PROTEINS} reactions={REACTIONS} />
      </div>
    </div>
  );
};
