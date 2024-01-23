import { Button } from "./Button";

export default {
  title: "UIElements/Button",
  component: Button,
  argTypes: {
    fullWidth: { type: "boolean" },
  },
};

export const ButtonStory = () => (
  <Button
    intent="primary"
    onClick={() => {
      alert("Button clicked");
    }}
  />
);
