import { classNames } from "@utils/stringUtils";
import { z } from "zod";

const PlateSelectionSchema = z.object({
  wells: z.set(z.number()),
});
type PlateSelection = z.infer<typeof PlateSelectionSchema>;

export const Plate = ({
  wells,
  className,
  selection,
}: {
  wells: 24 | 96 | 48 | 384;
  selection: PlateSelection | null;
  setSelection: (selection: PlateSelection) => void;
  className?: string;
}) => {
  let gridClass: string;
  const { rows, cols } = wellsToRowsCols(wells);
  const rowLabels: string[] = Array.from({ length: rows }, (_, i) =>
    (i + 1).toString(),
  );
  const colLabels: string[] = Array.from({ length: cols }, (_, i) =>
    String.fromCharCode(65 + i),
  );

  console.log(selection);
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
    <>
      <div
        className={classNames(
          "grid gap-2 rounded-md rounded-r-3xl border border-noir-800 py-4 pr-4 dark:border-noir-200",
          wells > 96 && "px-4",
          gridClass,
          className,
        )}
      >
        <div className="col-span-full col-start-2 grid grid-cols-subgrid ">
          {colLabels.map((colLabel) => (
            <div
              key={colLabel}
              className={classNames(
                "mx-auto flex items-end justify-center",
                wells > 96 && "break-all px-1 text-[0.6rem]",
                "text-noir-600 dark:text-noir-300",
              )}
            >
              {colLabel}
            </div>
          ))}
        </div>
        <div
          className={classNames(
            "col-span-1 grid grid-cols-subgrid ",
            wells > 96 && "content-between py-1",
            "text-noir-600 dark:text-noir-300",
          )}
        >
          {rowLabels.map((rowLabel) => (
            <div
              key={rowLabel}
              className={classNames(
                "mx-auto my-auto",
                wells > 96 && "text-[0.6rem]",
              )}
            >
              {rowLabel}
            </div>
          ))}
        </div>
        <div className="col-span-full col-start-2 grid grid-cols-subgrid gap-2 ">
          {Array.from({ length: wells }).map((_, i) => (
            <div
              key={i}
              className={classNames(
                "group my-auto flex aspect-square min-h-px min-w-px cursor-pointer items-center justify-center rounded-full ",
		"border-noir-800 dark:border-noir-200 border ",
                "text-noir-300 hover:bg-noir-200 hover:text-brand-500 dark:text-noir-600 hover:dark:bg-noir-600 hover:dark:text-brand-200",
              )}
            >
              <div
                className={classNames(wells > 96 && "opacity-0")}
                title={indexToExcelCell(i, wells)}
              >
                {indexToExcelCell(i, wells)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
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
