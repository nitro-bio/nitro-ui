import { ChatBox } from "@Mimir/ChatBox";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Card } from "@ui/Card";
import { useState } from "react";

export default {
  title: "Mimir/Chatbox",
  argTypes: {},
} as ComponentMeta<any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template: ComponentStory<any> = () => {
  const [chatEndpoint, setChatEndpoint] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  return (
    <Card className="grid grid w-full grid-cols-2 content-between gap-8 border bg-white dark:bg-noir-800">
      <label className="flex gap-8">
        API URL:
        <input
          type="text"
          className="input"
          value={chatEndpoint || ""}
          onChange={(e) => setChatEndpoint(e.target.value)}
        />
      </label>
      <label className="flex gap-8">
        API Key:
        <input
          type="password"
          className="input"
          value={apiKey || ""}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </label>
      {chatEndpoint && <ChatBox apiUrl={chatEndpoint} apiKey={apiKey} />}
    </Card>
  );
};

export const KitchenSinkViewerStory = Template.bind({});
KitchenSinkViewerStory.args = {};
