import { classNames } from "@utils/stringUtils";
import { SelectableGroup, createSelectable } from "react-selectable";
import { wellsToRowsCols, indexToExcelCell } from "./utils";
import { RowAnnotationGutter, ColAnnotationGutter } from "./AnnotationGutters";
import { AnnotationBar } from "./AnnotationBar";
import { useState } from "react";
import {
  WellAnnotation,
  RowAnnotation,
  ColAnnotation,
  PlateSelection,
} from "./schemas";

export interface PlateProps<
  RowMetaT extends Record<string, unknown>,
  ColMetaT extends Record<string, unknown>,
  WellMetaT extends Record<string, unknown>,
> {
  wells: 24 | 96 | 48 | 384;
  rowAnnotations?: RowAnnotation<RowMetaT>[];
  colAnnotations?: ColAnnotation<ColMetaT>[];
  wellAnnotations?: WellAnnotation<WellMetaT>[];
  selection: PlateSelection | null;
  setSelection: (selection: PlateSelection | null) => void;
  className?: string;
  selectionTolerance?: number;
}

export const Plate = <
  RowMetaT extends Record<string, unknown>,
  ColMetaT extends Record<string, unknown>,
  WellMetaT extends Record<string, unknown>,
>({
  wells,
  className,
  rowAnnotations,
  colAnnotations,
  wellAnnotations,
  selection,
  setSelection,
  selectionTolerance = 20,
}: PlateProps<RowMetaT, ColMetaT, WellMetaT>) => {
  const { rows, cols } = wellsToRowsCols(wells);
  const [activeRowAnnotation, setActiveRowAnnotation] =
    useState<RowAnnotation<RowMetaT> | null>(null);
  const [activeColAnnotation, setActiveColAnnotation] =
    useState<ColAnnotation<ColMetaT> | null>(null);
  const [activeWellAnnotation, setActiveWellAnnotation] =
    useState<WellAnnotation<WellMetaT> | null>(null);
  
    activeRowAnnotation?.id,
    activeColAnnotation?.id,
    activeWellAnnotation?.id,
  );
  const rowLabels: string[] = Array.from({ length: rows }, (_, i) =>
    (i + 1).toString(),
  );
  const colLabels: string[] = Array.from({ length: cols }, (_, i) =>
    String.fromCharCode(65 + i),
  );

  // Add the number of columns for the wells
  let gridClass: string;
  switch (wells) {
    case 24:
      gridClass = "grid-cols-8 gap-2 ";
      break;
    case 48:
      gridClass = "grid-cols-10 gap-2";
      break;
    case 96:
      gridClass = "grid-cols-14 gap-2 ";
      break;
    case 384:
      gridClass = "grid-cols-26 gap-2 ";
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
    <>
      <AnnotationBar
        wellAnnotations={wellAnnotations}
        colAnnotations={colAnnotations}
        rowAnnotations={rowAnnotations}
        activeRowAnnotation={activeRowAnnotation}
        setActiveRowAnnotation={setActiveRowAnnotation}
        activeColAnnotation={activeColAnnotation}
        setActiveColAnnotation={setActiveColAnnotation}
        activeWellAnnotation={activeWellAnnotation}
        setActiveWellAnnotation={setActiveWellAnnotation}
      />
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
          <ColAnnotationGutter
            colAnnotations={colAnnotations}
            activeColAnnotation={activeColAnnotation}
            setActiveColAnnotation={setActiveColAnnotation}
            wells={wells}
            className="col-span-full col-start-3"
          />

          <div className="col-span-full col-start-3 grid grid-cols-subgrid ">
            {colLabels.map((colLabel) => (
              <button
                key={`col-${colLabel}`}
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

          <RowAnnotationGutter
            rowAnnotations={rowAnnotations}
            activeRowAnnotation={activeRowAnnotation}
            setActiveRowAnnotation={setActiveRowAnnotation}
            wells={wells}
            className=""
          />

          <div
            className={classNames(
              "col-span-1 grid grid-cols-subgrid gap-2 ",
              wells > 96 && "content-between py-1",
              "text-noir-600 dark:text-noir-300",
            )}
          >
            {rowLabels.map((rowLabel) => (
              <button
                key={`row-${rowLabel}`}
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

          <div className="col-span-full col-start-3 grid grid-cols-subgrid gap-2 ">
            {Array.from({ length: wells }).map((_, i) => {
              const isSelected = selection?.wells.includes(i) ?? false;
              const anns: WellAnnotation<WellMetaT>[] =
                wellAnnotations?.filter((ann) => ann.wells.includes(i)) ?? [];
              return (
                <Well
                  key={`well-${i}`}
                  index={i}
                  wells={wells}
                  selectableKey={i}
                  isSelected={isSelected}
                  toggleSelection={toggleWellInSelection}
                  annotations={anns}
                />
              );
            })}
          </div>
        </div>
      </SelectableGroup>
    </>
  );
};
const Well = createSelectable(
  <WellMetaT extends Record<string, unknown>>({
    index,
    wells,
    selectableRef,
    isSelected,
    toggleSelection,
    annotations,
  }: {
    index: number;
    wells: 24 | 96 | 48 | 384;
    selectableRef?: React.RefObject<HTMLButtonElement>;
    selectableKey: number;
    isSelected: boolean;
    toggleSelection: (well: number) => void;
    annotations: WellAnnotation<WellMetaT>[];
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
          "relative overflow-hidden",
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
        {annotations.map((ann, index) => (
          <span
            key={ann.id}
            className={classNames(
              ann.className,
              "opacity-40 group-hover:opacity-50 dark:opacity-40",
              "transition-all duration-300 ease-in-out",
              "absolute inset-0",
              "flex items-center justify-center ",
              index === 0 && "rounded-l-full",
              index === annotations.length - 1 && "rounded-r-full",
            )}
            style={{
              width: (1 / annotations.length) * 100 + "%",
              left: (annotations.indexOf(ann) / annotations.length) * 100 + "%",
            }}
          />
        ))}
      </button>
    );
  },
);
