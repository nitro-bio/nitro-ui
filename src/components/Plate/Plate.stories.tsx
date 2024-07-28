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
      id: "Treatment 2",
      label: "Treatment 2",
      wells: [],
      className: "bg-blue-500 text-blue-50 ",
      metadata: {
        foo: "bar",
      },
    },
    {
      id: "Treatment 2",
      label: "Treatment 2",
      wells: [],
      className: "bg-red-500 text-red-50 ",
      metadata: {
        foo: "bar",
      },
    },
    {
      id: "Postive Control",
      label: "Postive Control",
      wells: [],
      className: "bg-green-500 text-green-50 ",
      metadata: {
        foo: "bar",
      },
    },
    {
      id: "Negative Control",
      label: "Negative Control",
      wells: [],
      className: "bg-fuchsia-500 text-fuchsia-50 ",
      metadata: {
        foo: "bar",
      },
    },
  ];

  const rowAnnotations: RowAnnotation<{}>[] = [
    {
      rows: [0, 1],
      label: "Antibody 1 μmol/L",
      id: "Antibody 1 μmol/L",
      className: "bg-cyan-500 text-cyan-50 ",
    },
    {
      rows: [3, 4],
      label: "Antibody 2 μmol/L",
      id: "Row Annotation 1",
      className: "bg-amber-500 text-amber-50 ",
    },
    {
      rows: [6, 7],
      label: "Antibody 3 μmol/L",
      id: "Row Annotation 2",
      className: "bg-rose-500 text-rose-50 ",
    },
  ];
  const colAnnotations: ColAnnotation<{}>[] = [
    {
      cols: [0, 1, 2, 3],
      label: "Patient 1",
      id: "Patient 1",
      className: "bg-blue-500 text-blue-50 ",
    },
    {
      cols: [4, 5, 6, 7],
      label: "Patient 2",
      id: "Patient 2",
      className: "bg-lime-500 text-lime-50 ",
    },
    {
      cols: [8, 9, 10, 11],
      label: "Patient 3",
      id: "Patient 3",
      className: "bg-fuchsia-500 text-fuchsia-50 ",
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
