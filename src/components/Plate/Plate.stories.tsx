import { Card } from "@ui/Card";
import { NitroContextMenu } from "@ui/ContextMenu/NitroContextMenu";
import { classNames } from "@utils/stringUtils";
import { useState } from "react";
import {
  ColAnnotation,
  Plate,
  PlateSelection,
  RowAnnotation,
  WellAnnotation,
} from "./Plate";

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
  const [wellAnnotations, setWellAnnotations] = useState<
    WellAnnotation<{ foo: string }>[]
  >([
    {
      id: "Treatment 1",
      label: "Treatment 1",
      wells: [
        0, 12, 36, 48, 72, 84, 4, 16, 40, 52, 76, 88, 8, 20, 44, 56, 80, 92,
      ],
      className: "bg-blue-500 text-blue-50 ",
      metadata: {
        foo: "bar",
      },
    },
    {
      id: "Treatment 2",
      label: "Treatment 2",
      wells: [
        1, 13, 37, 49, 73, 85, 5, 17, 41, 53, 77, 89, 9, 21, 45, 57, 81, 93,
      ],
      className: "bg-red-500 text-red-50 ",
      metadata: {
        foo: "bar",
      },
    },
    {
      id: "Postive Control",
      label: "Postive Control",
      wells: [
        2, 14, 38, 50, 74, 86, 6, 18, 42, 54, 78, 90, 10, 22, 46, 58, 82, 94,
      ],
      className: "bg-green-500 text-green-50 ",
      metadata: {
        foo: "bar",
      },
    },
    {
      id: "Negative Control",
      label: "Negative Control",
      wells: [
        3, 15, 39, 51, 75, 87, 7, 19, 43, 55, 79, 91, 11, 23, 47, 59, 83, 95,
      ],
      className: "bg-fuchsia-500 text-fuchsia-50 ",
      metadata: {
        foo: "bar",
      },
    },
  ]);

  const [rowAnnotations] = useState<RowAnnotation<Record<string, never>>[]>([
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
  ]);

  const [colAnnotations] = useState<ColAnnotation<Record<string, never>>[]>([
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
  ]);
  return (
    <Card className={classNames("max-w-4xl", className)}>
      <NitroContextMenu
        trigger={
          <Plate
            className="mr-2 pb-8"
            wells={wells}
            selection={selection}
            setSelection={setSelection}
            wellAnnotations={wellAnnotations}
            rowAnnotations={rowAnnotations}
            colAnnotations={colAnnotations}
          />
        }
        groups={[
          {
            label: "Create Annotations",
            type: "base",
            items: [
              ...wellAnnotations.map((ann) => ({
                id: ann.id,
                label: ann.label,
                onClick: () => {
                  if (selection) {
                    console.log("Create Annotation", ann.label, selection);
                    setWellAnnotations((prev) => {
                      const newAnn = {
                        ...ann,
                        wells: [...ann.wells, ...selection.wells],
                      };
                      return [...prev.filter((a) => a.id !== ann.id), newAnn];
                    });
                    setSelection(null);
                  } else {
                    console.log("Select wells to annotate");
                  }
                },
              })),
              {
                id: "Clear Annotations",
                label: "Clear Annotations",
                onClick: () => {
                  console.log("Clear Annotations");
                  if (selection) {
                    const selectedWells = selection.wells;
                    const next = wellAnnotations.map((ann) => {
                      const wells = ann.wells.filter(
                        (w) => !selectedWells.includes(w),
                      );
                      return { ...ann, wells };
                    });
                    setWellAnnotations(next);
                    setSelection(null);
                  }
                },
              },
            ],
          },
        ]}
      />
    </Card>
  );
};

export const Plate24 = () => <PlateStory wells={24} />;
export const Plate48 = () => <PlateStory wells={48} />;
export const Plate96 = () => <PlateStory wells={96} />;
export const Plate384 = () => <PlateStory wells={384} className="!max-w-5xl" />;
