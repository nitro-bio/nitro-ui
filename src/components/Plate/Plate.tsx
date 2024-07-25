import { classNames } from "@utils/stringUtils";
import { SelectableGroup, createSelectable } from "react-selectable";
import { RowAnnotation } from "@Ariadne/types";
import { z } from "zod";
import { wellsToRowsCols, indexToExcelCell } from "./utils";
import { RowAnnotationGutter } from "./RowAnnotationGutter";

const PlateSelectionSchema = z.object({
  wells: z.array(z.number()),
  className: z.string().optional(),
});
export type PlateSelection = z.infer<typeof PlateSelectionSchema>;

export interface PlateProps {
  wells: 24 | 96 | 48 | 384;
  rowAnnotations?: RowAnnotation[];
  selection: PlateSelection | null;
  setSelection: (selection: PlateSelection | null) => void;
  className?: string;
  selectionTolerance?: number;
}

export const Plate = ({
  wells,
  className,
  rowAnnotations,
  selection,
  setSelection,
  selectionTolerance = 20,
}: PlateProps) => {
  const { rows, cols } = wellsToRowsCols(wells);
  const rowLabels: string[] = Array.from({ length: rows }, (_, i) =>
    (i + 1).toString(),
  );
  const colLabels: string[] = Array.from({ length: cols }, (_, i) =>
    String.fromCharCode(65 + i),
  );

  // Num cols starts with one to support the row label column
  var numCols = 1;

  var numRowAnnotationCols = 0;
  // If there are row annotations, add a column to display them.
  if (rowAnnotations && rowAnnotations.length > 0) {
    // The number of columns that the row annotations will span
    numRowAnnotationCols = Math.ceil(rowAnnotations.length / 8);

    // Each column can support up to 8 row annotations
    numCols += numRowAnnotationCols;
  }

  // Add the number of columns for the wells
  switch (wells) {
    case 24:
      numCols += 6;
      break;
    case 48:
      numCols += 8;
      break;
    case 96:
      numCols += 12;
      break;
    case 384:
      numCols += 24;
      break;
    default:
      throw new Error("Invalid number of wells");
  }

  const handleSelection = (selectedKeys: string[]) => {
    const selectedWells = new Set([
      ...(selection?.wells ?? []),
      ...selectedKeys.map((k) => parseInt(k)),
    ]);
    setSelection({ wells: Array.from(selectedWells) });
  };

  const toggleSelection = (indices: number[]) => {
    const newSelection = new Set(selection?.wells ?? []);
    indices.forEach((well) => {
      if (newSelection.has(well)) {
        newSelection.delete(well);
      } else {
        newSelection.add(well);
      }
    });
    setSelection({ wells: Array.from(newSelection) });
  };

  const toggleWellInSelection = (well: number) => {
    toggleSelection([well]);
  };

  const toggleColumnInSelection = (col: number) => {
    const indices = Array.from({ length: rows }, (_, row) => row * cols + col);
    toggleSelection(indices);
  };

  const toggleRowInSelection = (row: number) => {
    const indices = Array.from({ length: cols }, (_, col) => row * cols + col);
    toggleSelection(indices);
  };

  return (
    <SelectableGroup
      onEndSelection={handleSelection}
      tolerance={selectionTolerance}
      className={classNames("", className)}
      selectingClassName="transition-all duration-100 ease-in-out animate-pulse "
    >
      <div
        className={classNames(
          "grid gap-2  ",
          "text-xs md:text-sm lg:text-base",
          wells > 96 && "px-4",
          `grid-cols-${numCols} gap-2`,
        )}
        style={{
          gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
        }}
      >
        <div
          className="col-span-full grid grid-cols-subgrid"
          style={{
            // The column labels typically start at column 2, but if there
            // are row annotations, they start at column 3 or more
            gridColumnStart: numRowAnnotationCols + 2,
          }}
        >
          {colLabels.map((colLabel) => (
            <button
              key={colLabel}
              className={classNames(
                "flex items-end justify-center",
                wells > 96 && "break-all px-1 text-[0.6rem]",
                "border-b border-l border-r border-noir-300 pb-1 text-noir-600 dark:border-noir-500 dark:text-noir-300",
                "hover:bg-noir-200 hover:text-brand-500 dark:text-noir-600 hover:dark:bg-noir-600 hover:dark:text-brand-200",
              )}
              onClick={() => {
                toggleColumnInSelection(colLabels.indexOf(colLabel));
              }}
            >
              {colLabel}
            </button>
          ))}
        </div>

        {/*
        <div className={colLabelClass}>
          {colLabels.map((colLabel) => (
            <div>G</div>
          ))}
        </div>
        */}
        <div
          className={classNames(
            "col-span-1 grid grid-cols-subgrid gap-2 ",
            wells > 96 && "content-between py-1",
            "text-noir-600 dark:text-noir-300",
          )}
        >
          {rowLabels.map((rowLabel) => (
            <button
              key={rowLabel}
              onClick={() => {
                toggleRowInSelection(rowLabels.indexOf(rowLabel));
              }}
              className={classNames(
                "mx-auto h-full px-1",
                wells > 96 && "text-[0.6rem]",
                "border-b border-r border-t border-noir-300 pb-1 pr-1 text-noir-600 dark:border-noir-500 dark:text-noir-300",
                "hover:bg-noir-200 hover:text-brand-500 dark:text-noir-600 hover:dark:bg-noir-600 hover:dark:text-brand-200",
              )}
            >
              {rowLabel}
            </button>
          ))}
        </div>

        {/* Display Row Annotations */}

        {rowAnnotations && (
          <RowAnnotationGutter rowAnnotations={rowAnnotations} wells={wells} />
        )}

        <div
          className="col-span-full grid grid-cols-subgrid gap-2"
          style={{
            gridColumnStart: numRowAnnotationCols + 2,
          }}
        >
          {Array.from({ length: wells }).map((_, i) => {
            const isSelected = selection?.wells.includes(i) ?? false;
            return (
              <Well
                key={i}
                index={i}
                wells={wells}
                selectableKey={i}
                isSelected={isSelected}
                toggleSelection={toggleWellInSelection}
              />
            );
          })}
        </div>
      </div>{" "}
    </SelectableGroup>
  );
};
const Well = createSelectable(
  ({
    index,
    wells,
    selectableRef,
    isSelected,
    toggleSelection,
  }: {
    index: number;
    wells: 24 | 96 | 48 | 384;
    selectableRef?: React.RefObject<HTMLButtonElement>;
    selectableKey: number;
    isSelected: boolean;
    toggleSelection: (well: number) => void;
  }) => {
    return (
      <button
        ref={selectableRef}
        onClick={() => {
          toggleSelection(index);
        }}
        className={classNames(
          "group my-auto flex h-full w-full cursor-pointer items-center justify-center",
          "aspect-square max-h-full min-h-px min-w-px max-w-full rounded-full",
          "transition-all duration-300 ease-in-out",
          "border border-noir-800 dark:border-noir-200",
          "hover:scale-110",
          isSelected
            ? "bg-brand-200 text-noir-900 dark:bg-brand-600 dark:text-noir-100"
            : "text-noir-300 dark:text-noir-600",
          isSelected
            ? "hover:opacity-50"
            : "hover:text-brand-500 hover:dark:text-brand-200",
        )}
      >
        <span
          className={classNames(
            wells === 24 && "text-2xl",
            wells == 48 && "text-xl",
            wells === 96 && "text-sm",
            wells == 384 && "hidden",
            "text-noir-600 dark:text-noir-300",
          )}
        >
          {indexToExcelCell(index, wells)}
        </span>
      </button>
    );
  },
);
