import { classNames } from "@utils/stringUtils";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { PlateSelectionOverlay } from "./PlateSelectionOverlay";

const PlateSelectionSchema = z.object({
  wells: z.set(z.number()),
  className: z.string().optional(),
});
export type PlateSelection = z.infer<typeof PlateSelectionSchema>;

export const Plate = ({
  wells,
  className,
  selection,
  setSelection,
}: {
  wells: 24 | 96 | 48 | 384;
  selection: PlateSelection | null;
  setSelection: (selection: PlateSelection | null) => void;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  let gridClass: string;
  const { rows, cols } = wellsToRowsCols(wells);
  const rowLabels: string[] = Array.from({ length: rows }, (_, i) =>
    (i + 1).toString(),
  );
  const colLabels: string[] = Array.from({ length: cols }, (_, i) =>
    String.fromCharCode(65 + i),
  );
  const toggleSelection = (indices: Set<number> | number[]) => {
    const newSelection = new Set(selection?.wells ?? []);
    indices.forEach((well) => {
      if (newSelection.has(well)) {
        newSelection.delete(well);
      } else {
        newSelection.add(well);
      }
    });

    setSelection({ wells: newSelection });
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
  const [wellBoxes, setWellBoxes] = useState<DOMRect[]>([]);
  useEffect(
    function _calculateWellBoxes() {
      const calculateWellBoxes = () => {
        if (ref.current) {
          const newWellBoxes: DOMRect[] = [];
          // Iterate through each well and calculate the bounding box
          for (let i = 0; i < wells; i++) {
            const wellElement = ref.current.querySelector(
              `#well-${i}`,
            ) as HTMLElement;
            if (wellElement) {
              const boundingRect = wellElement.getBoundingClientRect();
              newWellBoxes.push(boundingRect);
            } else {
              console.error(`Well ${i} not found`);
            }
          }

          setWellBoxes(newWellBoxes);
        }
      };

      // Run the calculation after the component has mounted and the browser has applied the layout.
      calculateWellBoxes();
      // and then run it again whenever the window is resized
      window.addEventListener("resize", calculateWellBoxes);
      return () => window.removeEventListener("resize", calculateWellBoxes);
    },
    [wells, ref],
  );
  switch (wells) {
    case 24:
      gridClass = "grid-cols-7 gap-4 ";
      break;
    case 48:
      gridClass = "grid-cols-9 gap-4";
      break;
    case 96:
      gridClass = "grid-cols-13 gap-1 ";
      break;
    case 384:
      gridClass = "grid-cols-25 gap-1 ";
      break;
    default:
      throw new Error("Invalid number of wells");
  }
  return (
    <div className="relative select-none" ref={ref}>
      {wellBoxes.length > 0 ? (
        <PlateSelectionOverlay
          plateRef={ref}
          wellBoxes={wellBoxes}
          toggleSelection={(indices) => {
            toggleSelection(indices);
          }}
        />
      ) : (
        <>Loading...</>
      )}

      <div
        className={classNames(
          "grid gap-2 rounded-md rounded-r-3xl border border-noir-800 py-4 pr-4 dark:border-noir-200",
          "text-xs md:text-sm lg:text-base",
          wells > 96 && "px-4",
          gridClass,
          className,
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
            "col-span-1 grid grid-cols-subgrid gap-1 ",
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
          {Array.from({ length: wells }).map((_, i) => (
            <button
              key={i}
              id={`well-${i}`}
              className={classNames(
                "group my-auto flex cursor-pointer items-center justify-center ",
                "aspect-square h-full min-h-px w-full min-w-px",
                "transition-all duration-300 ease-in-out",
                "border border-noir-800 dark:border-noir-200",

                "hover:scale-110",
                selection?.wells.has(i)
                  ? "bg-brand-200 text-noir-900 dark:bg-brand-600 dark:text-noir-100"
                  : "text-noir-300 dark:text-noir-600",
                selection?.wells.has(i)
                  ? "hover:opacity-50"
                  : "hover:text-brand-500 hover:dark:text-brand-200",
                selection?.wells.has(i) && selection.className,
              )}
              onClick={() => {
                toggleWellInSelection(i);
              }}
            >
              <div
                className={classNames(wells > 96 && "opacity-0")}
                title={indexToExcelCell(i, wells)}
              >
                {wellBoxes.length > 0 && (
                  <>
                    {wellBoxes[i].x.toFixed(0)}, {wellBoxes[i].y.toFixed(0)}
                  </>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

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
