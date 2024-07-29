import { classNames } from "@utils/stringUtils";
import { ColAnnotation, RowAnnotation } from "./Plate";
import { wellsToRowsCols } from "./utils";

export const RowAnnotationGutter = <RowMetaT extends Record<string, unknown>>({
  rowAnnotations,
  activeRowAnnotation,
  setActiveRowAnnotation,
  wells,
  className,
}: {
  rowAnnotations?: RowAnnotation<RowMetaT>[];
  activeRowAnnotation: RowAnnotation<RowMetaT> | null;
  setActiveRowAnnotation: (ann: RowAnnotation<RowMetaT> | null) => void;

  wells: 24 | 96 | 48 | 384;
  className?: string;
}) => {
  const { rows } = wellsToRowsCols(wells);

  if (!rowAnnotations || rowAnnotations.length === 0) {
    return null;
  }

  return (
    <>
      <div
        className={classNames(
          "grid",
          "text-noir-600 dark:text-noir-300",
          className,
        )}
      >
        {Array.from({ length: rows }).map((_, rowIndex) => {
          const numCols = rowAnnotations.length;

          return (
            <div
              className="grid gap-1"
              key={rowIndex}
              style={{
                gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
              }}
            >
              {rowAnnotations.map((rowAnn) => {
                if (rowAnn.rows.includes(rowIndex)) {
                  return (
                    <button
                      key={"row-ann" + rowAnn.id + rowIndex}
                      className={classNames(
                        rowAnn.className,
                        activeRowAnnotation?.id === rowAnn.id
                          ? "opacity-100"
                          : "opacity-50",
                        "min-h-px",
                        "hover:!opacity-100",
                      )}
                      onClick={() => {
                        setActiveRowAnnotation(
                          activeRowAnnotation?.id === rowAnn.id ? null : rowAnn,
                        );
                      }}
                    ></button>
                  );
                } else {
                  return <div key={`row-placeholder-${rowIndex}`}></div>;
                }
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export const ColAnnotationGutter = <ColMetaT extends Record<string, unknown>>({
  colAnnotations,
  activeColAnnotation,
  setActiveColAnnotation,
  wells,
  className,
}: {
  colAnnotations?: ColAnnotation<ColMetaT>[];
  activeColAnnotation: ColAnnotation<ColMetaT> | null;
  setActiveColAnnotation: (ann: ColAnnotation<ColMetaT> | null) => void;

  wells: 24 | 96 | 48 | 384;
  className?: string;
}) => {
  const { cols } = wellsToRowsCols(wells);
  if (!colAnnotations || colAnnotations?.length === 0) {
    return null;
  }
  return (
    <>
      <div
        className={classNames(
          "grid",
          "text-noir-600 dark:text-noir-300",
          "h-20",
          wells > 24 && "!h-14", // 48 wells
          wells > 48 && "!h-[40px]", // 96 wells
          wells > 96 && "!h-4", // 384 wells

          className,
        )}
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: cols }).map((_, colIndex) => {
          const numRows = colAnnotations.length;
          return (
            <div
              className={classNames("grid gap-1")}
              key={colIndex}
              style={{
                gridTemplateRows: `repeat(${numRows}, minmax(0, 1fr))`,
              }}
            >
              {colAnnotations.map((colAnn) => {
                if (colAnn.cols.includes(colIndex)) {
                  return (
                    <button
                      key={"col-ann" + colAnn.id + colIndex}
                      className={classNames(
                        colAnn.className,
                        activeColAnnotation?.id === colAnn.id
                          ? "opacity-100"
                          : "opacity-50",
                        "min-h-px",
                        "hover:!opacity-100",
                      )}
                      onClick={() => {
                        setActiveColAnnotation(
                          activeColAnnotation?.id === colAnn.id ? null : colAnn,
                        );
                      }}
                    ></button>
                  );
                } else {
                  return <div key={colIndex}></div>;
                }
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};
