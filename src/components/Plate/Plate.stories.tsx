import { useState, useMemo } from "react";
import { Card } from "@ui/Card";
import {
  Plate,
  PlateSelection,
  WellAnnotation,
  RowAnnotation,
  ColAnnotation,
} from "./Plate";
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
): RowAnnotation<{}>[] => {
  const rowAnnotations: RowAnnotation<{}>[] = [];
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
  console.log(rowAnnotations);
  return rowAnnotations;
};

export const TwentyFourWithWellAnns = () => {
  const [selection, setSelection] = useState<PlateSelection | null>(null);
  const wellAnnotations: WellAnnotation<{ foo: string }>[] = [
    {
      id: "0",
      label: "Foo",
      wells: [0, 1, 2, 3, 4, 5, 6, 7],
      className: "bg-blue-500 dark:text-blue-200 text-blue-800",
      metadata: {
        foo: "bar",
      },
    },
    {
      id: "1",
      label: "Bar",
      wells: [4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17],
      className: "bg-red-500 dark:text-red-200 text-red-800",
      metadata: {
        foo: "bar",
      },
    },
    {
      id: "2",
      label: "Baz",
      wells: [14, 15, 16, 17, 20, 21, 22, 23, 24, 25, 26, 27],
      className: "bg-green-500 dark:text-green-200 text-green-800",
      metadata: {
        foo: "bar",
      },
    },
    {
      id: "3",
      label: "Qux",
      wells: [25, 26, 27, 30, 31, 32, 33, 34, 35, 36, 37],
      className: "bg-fuchsia-500 dark:text-fuchsia-200 text-fuchsia-800",
      metadata: {
        foo: "bar",
      },
    },
  ];

  const rowAnnotations: RowAnnotation<{}>[] = [
    {
      rows: [0, 1, 2, 3],
      label: "Row Annotation 0",
      id: "0",
      className: "bg-cyan-500",
    },
    {
      rows: [0, 1, 2, 4, 5, 6, 7],
      label: "Row Annotation 1",
      id: "1",
      className: "bg-amber-500",
    },
    {
      rows: [0, 1, 5, 6, 7],
      label: "Row Annotation 2",
      id: "2",
      className: "bg-rose-500",
    },
  ];
  const colAnnotations: ColAnnotation<{}>[] = [
    {
      cols: [0, 1, 2, 3, 4, 5, 6, 7],
      label: "Row Annotation 0",
      id: "0",
      className: "bg-blue-500",
    },
    {
      cols: [0, 1, 3, 6, 9],
      label: "Row Annotation 1",
      id: "1",
      className: "bg-lime-500",
    },
    {
      cols: [6, 7, 8, 9, 10],
      label: "Row Annotation 2",
      id: "2",
      className: "bg-fuchsia-500",
    },
  ];
  return (
    <Card className="max-w-3xl">
      <Plate
        wells={96}
        selection={selection}
        setSelection={setSelection}
        wellAnnotations={wellAnnotations}
        rowAnnotations={rowAnnotations}
        colAnnotations={colAnnotations}
      />
    </Card>
  );
};
