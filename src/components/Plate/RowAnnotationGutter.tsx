import React, { useState, useEffect } from "react";
import { classNames } from "@utils/stringUtils";
import { wellsToRowsCols } from "./utils";
import { ColAnnotation, RowAnnotation } from "./Plate";

export const RowAnnotationGutter = ({
  rowAnnotations,
  wells,
  className,
}: {
  rowAnnotations?: RowAnnotation<{}>[];
  wells: 24 | 96 | 48 | 384;
  className?: string;
}) => {
  const [activeAnn, setActiveAnn] = useState<RowAnnotation<{}> | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { rows } = wellsToRowsCols(wells);

  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (activeAnn) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [activeAnn]);

  if (!rowAnnotations || rowAnnotations.length === 0) {
    return null;
  }

  return (
    <>
      {activeAnn && (
        <div
          key="row-gutter-mouseover"
          className="absolute z-50 rounded-lg bg-noir-800 p-2 text-white"
          style={{
            top: mousePosition.y,
            left: mousePosition.x,
            //transform: 'translate(0, 10px)', // Offset to prevent cursor overlap
          }}
        >
          <div>{activeAnn.label}</div>
        </div>
      )}
      <div
        className={classNames(
          "grid",
          wells > 96 && "content-between py-1",
          "text-noir-600 dark:text-noir-300",
          className,
        )}
      >
        {Array.from({ length: rows }).map((_, index) => {
          const numCols = rowAnnotations.length;

          return (
            <div
              className="grid gap-1"
              key={index}
              style={{
                gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
              }}
            >
              {rowAnnotations.map((rowAnn) => {
                if (rowAnn.rows.includes(index)) {
                  return (
                    <div
                      key={"ra" + rowAnn.id + index}
                      className={classNames(
                        rowAnn.className,
                        activeAnn === rowAnn ? "opacity-100" : "opacity-50",
                      )}
                      onMouseEnter={() => {
                        setActiveAnn(rowAnn);
                      }}
                      onMouseLeave={() => {
                        setActiveAnn(null);
                      }}
                    ></div>
                  );
                } else {
                  return <div key={index}></div>;
                }
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export const ColAnnotationGutter = ({
  colAnnotations,
  wells,
  className,
}: {
  colAnnotations?: ColAnnotation<{}>[];
  wells: 24 | 96 | 48 | 384;
  className?: string;
}) => {
  const [activeAnn, setActiveAnn] = useState<ColAnnotation<{}> | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { cols } = wellsToRowsCols(wells);

  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (activeAnn) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [activeAnn]);

  if (!colAnnotations || colAnnotations.length === 0) {
    return null;
  }

  return (
    <>
      {activeAnn && (
        <div
          key="col-gutter-mouseover"
          className="absolute z-50 rounded-lg bg-noir-800 p-2 text-white"
          style={{
            top: mousePosition.y,
            left: mousePosition.x,
          }}
        >
          <div>{activeAnn.label}</div>
        </div>
      )}
      <div
        className={classNames(
          "grid",
          wells > 96 && "content-between py-1",
          "text-noir-600 dark:text-noir-300",
          className,
          "h-8",
        )}
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: cols }).map((_, colIndex) => {
          const numCols = colAnnotations.length;
          return (
            <div
              className="grid gap-1"
              key={colIndex}
              style={{
                gridTemplateRows: `repeat(${numCols}, minmax(0, 1fr))`,
              }}
            >
              {colAnnotations.map((colAnn) => {
                if (colAnn.cols.includes(colIndex)) {
                  return (
                    <div
                      key={"ca" + colAnn.id + colIndex}
                      className={classNames(
                        colAnn.className,
                        activeAnn === colAnn ? "opacity-100" : "opacity-50",
                      )}
                      onMouseEnter={() => {
                        setActiveAnn(colAnn);
                      }}
                      onMouseLeave={() => {
                        setActiveAnn(null);
                      }}
                    ></div>
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
