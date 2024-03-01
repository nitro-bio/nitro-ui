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
  wells: 24 | 96 | 384 | 1536;
  selection: PlateSelection | null;
  setSelection: (selection: PlateSelection) => void;
  className?: string;
}) => {
  let gridClass: string;
  switch (wells) {
    case 24:
      gridClass = "grid-cols-6 gap-4 ";
      break;
    case 96:
      gridClass = "grid-cols-12 gap-1 ";
      break;
    case 384:
      gridClass = "grid-cols-24 gap-1 ";
      break;
    case 1536:
      gridClass = "grid-cols-48 gap-1 ";
      break;
    default:
      throw new Error("Invalid number of wells");
  }

  return (
    <div
      className={classNames(
        "grid rounded-md rounded-br-2xl border p-2",
        gridClass,
        className,
      )}
    >
      {Array.from({ length: wells }).map((_, i) => (
        <div
          key={i}
          className={classNames(
            "flex aspect-square min-h-px min-w-px cursor-pointer items-center justify-center rounded-full border hover:bg-noir-600 hover:text-brand-200 hover:shadow-md",
          )}
        >
          <div
            className={classNames(
              wells > 96 && "opacity-0",
              selection?.wells.has(i + 1) && "bg-brand-200 text-noir-900",
            )}
          >
            {i + 1}
          </div>
        </div>
      ))}
    </div>
  );
};
