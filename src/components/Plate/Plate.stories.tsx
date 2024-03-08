import { Card } from "@ui/Card";
import { Plate, PlateSelection } from "./Plate";
import { useState } from "react";

export default {
  title: "Plate/Plate",
  component: Plate,
};

export const TwentyFour = () => {
  const [selection, setSelection] = useState<PlateSelection | null>(null);
  return (
    <Card className="max-w-3xl p-8">
      <Plate wells={24} selection={selection} setSelection={setSelection} />
    </Card>
  );
};
export const FourtyEight = () => {
  const [selection, setSelection] = useState<PlateSelection | null>(null);
  return (
    <Card className="max-w-3xl p-8">
      <Plate wells={48} selection={selection} setSelection={setSelection} />
    </Card>
  );
};

export const NinetySix = () => {
  const [selection, setSelection] = useState<PlateSelection | null>(null);
  return (
    <Card className="max-w-3xl p-8">
      <Plate wells={96} selection={selection} setSelection={setSelection} />
    </Card>
  );
};

export const ThreeEightyFour = () => {
  const [selection, setSelection] = useState<PlateSelection | null>(null);
  return (
    <Card className="max-w-3xl p-8">
      <Plate wells={384} selection={selection} setSelection={setSelection} />
    </Card>
  );
};
