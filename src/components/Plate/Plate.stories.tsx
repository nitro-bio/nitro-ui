import { useState, useMemo } from "react";
import { Card } from "@ui/Card";
import { Plate, PlateSelection } from "./Plate";
import { RowAnnotation } from "@Ariadne/types";
import { wellsToRowsCols } from "./utils";

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

const PlateStory = ({
  wells,
  initialSelection,
  maxRandomRowAnnotations,
}: {
  wells: 24 | 96 | 48 | 384;
  initialSelection?: PlateSelection;
  maxRandomRowAnnotations?: number;
}) => {
  const { rowAnnotations } = useMemo(() => {
    return {
      rowAnnotations: generateRandomRowAnnotations(
        maxRandomRowAnnotations || 0,
        wells,
      ),
    };
  }, []);

  const [selection, setSelection] = useState<PlateSelection | null>(
    initialSelection ?? null,
  );

  return (
    <Card className="max-w-7xl">
      <Plate
        wells={wells}
        selection={selection}
        setSelection={setSelection}
        rowAnnotations={rowAnnotations}
      />
    </Card>
  );
};

export const NinetySixyWithRowAnnotations = () => {
  return <PlateStory wells={96} maxRandomRowAnnotations={15} />;
};

export const TwentyFourWithRowAnnotations = () => {
  return <PlateStory wells={24} maxRandomRowAnnotations={4} />;
};

// Generate up to maxRowAnnotations random row annotations
const generateRandomRowAnnotations = (
  maxRowAnnotations: number,
  wells: 24 | 96 | 48 | 384,
): RowAnnotation[] => {
  const rowAnnotations: RowAnnotation[] = [];
  const { rows: numRows } = wellsToRowsCols(wells);

  const bgColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-gray-500",
  ];
  const numRowAnnotations = Math.floor(Math.random() * maxRowAnnotations);

  for (let i = 0; i < numRowAnnotations; i++) {
    const annNumRows = Math.floor(Math.random() * numRows);
    const selectedRows = [];
    for (let j = 0; j < annNumRows; j++) {
      selectedRows.push(Math.floor(Math.random() * numRows));
    }

    rowAnnotations.push({
      rows: selectedRows,
      label: `Row Annotation ${i}`,
      id: `${i}`,
      className: bgColors[i % bgColors.length],
    });
  }
  return rowAnnotations;
};
