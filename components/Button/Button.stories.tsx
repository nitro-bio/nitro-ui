import { ComponentMeta } from "@storybook/react";

import { Button } from "./Button";
export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

export const Normal = () => (
  <Button onClick={() => alert("Hello")}>Hello</Button>
);
