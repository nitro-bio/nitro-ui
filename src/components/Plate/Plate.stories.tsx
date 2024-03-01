import { Card } from "@ui/Card";
import { Plate } from "./Plate";

export default {
  title: "Plate/Plate",
  component: Plate,
};

export const TwentyFour = () => {
  return (
    <Card className="max-w-3xl">
      <Plate wells={24} />
    </Card>
  );
};

export const NinetySix = () => {
  return (
    <Card className="max-w-3xl">
      <Plate wells={96} />
    </Card>
  );
};

export const ThreeEightyFour = () => {
  return (
    <Card className="max-w-3xl">
      <Plate wells={384} />
    </Card>
  );
};

export const FifteenThirtySix = () => {
  return (
    <Card className="max-w-3xl">
      <Plate wells={1536} />
    </Card>
  );
};
