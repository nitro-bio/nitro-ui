import { classNames } from "@utils/stringUtils";
import { SelectableGroup, createSelectable } from "react-selectable";
import { z } from "zod";
const PlateSelectionSchema = z.object({
  wells: z.array(z.number()),
  className: z.string().optional(),
});
export type PlateSelection = z.infer<typeof PlateSelectionSchema>;

export const Plate = ({
  wells,
  className,
  selection,
  setSelection,
  selectionTolerance = 20,
}: {
  wells: 24 | 96 | 48 | 384;
  selection: PlateSelection | null;
  setSelection: (selection: PlateSelection | null) => void;
  className?: string;
  selectionTolerance?: number;
}) => {
  let gridClass: string;
  const { rows, cols } = wellsToRowsCols(wells);
  const rowLabels: string[] = Array.from({ length: rows }, (_, i) =>
    (i + 1).toString(),
  );
  const colLabels: string[] = Array.from({ length: cols }, (_, i) =>
    String.fromCharCode(65 + i),
  );

  switch (wells) {
    case 24:
      gridClass = "grid-cols-7 gap-2 ";
      break;
    case 48:
      gridClass = "grid-cols-9 gap-2";
      break;
    case 96:
      gridClass = "grid-cols-13 gap-2 ";
      break;
    case 384:
      gridClass = "grid-cols-25 gap-2 ";
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
          gridClass,
        )}
      >
        <div className="col-span-full col-start-2 grid grid-cols-subgrid ">
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

        <div className="col-span-full col-start-2 grid grid-cols-subgrid gap-2 ">
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

const wellsToRowsCols = (wells: 24 | 96 | 48 | 384) => {
  switch (wells) {
    case 24:
      return { rows: 4, cols: 6 };
    case 48:
      return { rows: 6, cols: 8 };
    case 96:
      return { rows: 8, cols: 12 };
    case 384:
      return { rows: 16, cols: 24 };
    default:
      throw new Error("Invalid number of wells");
  }
};

const indexToExcelCell = (index: number, wells: 24 | 96 | 48 | 384) => {
  const { cols } = wellsToRowsCols(wells);
  const row = Math.floor(index / cols);
  const col = index % cols;
  return `${String.fromCharCode(65 + col)}${row + 1}`;
};
