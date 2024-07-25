import { Card } from "@ui/Card";
import { Plate, PlateSelection } from "./Plate";
import { useState } from "react";
import { RowAnnotation } from "@Ariadne/types";

export default {
  title: "Plate/Plate",
  component: Plate,
};

export const TwentyFour = () => {
  const [selection, setSelection] = useState<PlateSelection | null>(null);
  return (
    <Card className="max-w-3xl">
      <Plate
        className="-ml-5 -ml-8"
        wells={24}
        selection={selection}
        setSelection={setSelection}
      />
    </Card>
  );
};
export const FourtyEight = () => {
  const [selection, setSelection] = useState<PlateSelection | null>(null);
  return (
    <Card className="max-w-3xl">
      <Plate wells={48} selection={selection} setSelection={setSelection} />
    </Card>
  );
};

export const NinetySix = () => {
  const [selection, setSelection] = useState<PlateSelection | null>(null);
  return (
    <Card className="max-w-3xl">
      <Plate wells={96} selection={selection} setSelection={setSelection} />
    </Card>
  );
};

export const ThreeEightyFour = () => {
  const [selection, setSelection] = useState<PlateSelection | null>(null);
  return (
    <Card className="max-w-7xl">
      <Plate wells={384} selection={selection} setSelection={setSelection} />
    </Card>
  );
};

export const NinetySixyWithRowAnnotations = () => {
  const [selection, setSelection] = useState<PlateSelection | null>(null);

  const rowAnnotations = generateRandomRowAnnotations(4);
  console.log(rowAnnotations);

  return (
    <Card className="max-w-7xl">
      <Plate
        wells={96}
        selection={selection}
        setSelection={setSelection}

        rowAnnotations={rowAnnotations}
      />
    </Card>
  );
};

const generateRandomRowAnnotations = (numRowAnnotations : number) : RowAnnotation[] => {
  const rowAnnotations: RowAnnotation[] = [];

  const bgColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-gray-500'];

  for (let i = 0; i < numRowAnnotations; i++) {
    const numRows = Math.floor(Math.random() * 8);
    const rows = []
    for (let j = 0; j < numRows; j++) {
      rows.push(Math.floor(Math.random() * 8));
    }

    rowAnnotations.push({
      rows: rows,
      label: `Row Annotation ${i}`,
      id: `${i}`,
      className: bgColors[i % bgColors.length],
    });
  }
  return rowAnnotations;
}
