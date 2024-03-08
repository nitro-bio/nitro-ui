import { Card } from "./Card";

export default {
  title: "UIElements/Card",
  component: Card,
};

export const CardStory = () => (
  <Card>
    <div> Hello World</div>
    <div>Foo bar baz</div>
  </Card>
);
