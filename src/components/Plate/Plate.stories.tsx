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
import { classNames } from "@utils/stringUtils";

export default {
  title: "Plate/Plate",
  component: Plate,
};

const PlateStory = ({
  wells,
  className,
}: {
  wells: 24 | 96 | 48 | 384;
  className?: string;
}) => {
  const [selection, setSelection] = useState<PlateSelection | null>(null);
  const wellAnnotations: WellAnnotation<{ foo: string }>[] = [
    {
      id: "0",
      label: "Foo",
      wells: [
        0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 30, 31, 32, 33, 34, 35,
        36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 60, 61, 62, 63, 64, 65, 66, 67,

        100, 101, 102, 103, 104, 105, 106, 107, 110, 111, 112, 113, 114, 115,
        130, 131, 132, 133, 134, 135, 136, 137,
      ],
      className: "bg-blue-500  dark:text-blue-200 text-blue-800",
      metadata: {
        foo: "bar",
      },
    },
    {
      id: "1",
      label: "Bar",
      wells: [
        203, 207, 213, 215, 217, 222, 223, 224, 225, 226, 227, 233, 236, 245,
        247, 256, 275, 276, 283,
      ],
      className: "bg-red-500  dark:text-red-200 text-red-800",
      metadata: {
        foo: "bar",
      },
    },
    {
      id: "2",
      label: "Baz",
      wells: [
        14, 15, 16, 17, 20, 21, 22, 23, 24, 25, 26, 27, 130, 131, 132, 233, 234,
        235, 33, 34, 35, 36, 137,
      ],
      className: "bg-green-500  dark:text-green-200 text-green-800",
      metadata: {
        foo: "bar",
      },
    },
    {
      id: "3",
      label: "Qux",
      wells: [
        4, 10, 11, 15, 16, 17, 14, 20, 22, 25, 26, 27, 24, 37, 40, 44, 45, 46,
        47, 67, 70, 77, 75, 76,

        80, 81, 82, 83, 84, 85, 86, 87, 90, 91, 92, 93, 94, 95,

        100, 101, 104, 105, 106, 107, 110, 111, 114, 115, 116, 137, 200, 201,
        202, 204, 205, 206, 207, 210, 211, 212, 214, 215, 220, 221, 222, 224,
        225, 226, 237, 300, 301, 302, 303, 304, 305, 306, 307, 310, 311, 312,
        313, 314, 315, 330, 331, 332, 333, 334, 335, 336, 337,
      ],
      className: "bg-fuchsia-500 dark:text-fuchsia-200 text-fuchsia-800",
      metadata: {
        foo: "bar",
      },
    },
  ];

  const rowAnnotations: RowAnnotation<{}>[] = [
    {
      rows: [0, 1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 22],
      label: "Row Annotation 0",
      id: "0",
      className: "bg-cyan-500",
    },
    {
      rows: [0, 1, 3, 6, 9, 12, 15, 18, 21],
      label: "Row Annotation 1",
      id: "1",
      className: "bg-amber-500",
    },
    {
      rows: [1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23],
      label: "Row Annotation 2",
      id: "2",
      className: "bg-rose-500",
    },
  ];
  const colAnnotations: ColAnnotation<{}>[] = [
    {
      cols: [0, 1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 22],
      label: "Row Annotation 0",
      id: "0",
      className: "bg-blue-500",
    },
    {
      cols: [0, 1, 3, 6, 9, 12, 15, 18, 21],
      label: "Row Annotation 1",
      id: "1",
      className: "bg-lime-500",
    },
    {
      cols: [1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 21, 22, 23],
      label: "Row Annotation 2",
      id: "2",
      className: "bg-fuchsia-500",
    },
  ];
  return (
    <Card className={classNames("mx-8 my-8 max-w-4xl px-8 py-6", className)}>
      <Plate
        wells={wells}
        selection={selection}
        setSelection={setSelection}
        wellAnnotations={wellAnnotations}
        rowAnnotations={rowAnnotations}
        colAnnotations={colAnnotations}
      />
    </Card>
  );
};

export const Plate24 = () => <PlateStory wells={24} />;
export const Plate48 = () => <PlateStory wells={48} />;
export const Plate96 = () => <PlateStory wells={96} />;
export const Plate384 = () => <PlateStory wells={384} className="!max-w-5xl" />;
