import React, { useState } from "react";
import { RowAnnotation } from "@Ariadne/types";
import { classNames } from "@utils/stringUtils";
import { wellsToRowsCols } from "./utils";


export const RowAnnotationGutter = ({rowAnnotations} : {
    rowAnnotations: RowAnnotation[]
}) => {

  const [activeAnn, setActiveAnn] = useState<RowAnnotation | null>(null);

  // FIX ME
  const wells = 96;
  const { rows, cols } = wellsToRowsCols(wells);

  const numRowAnnotationCols = rowAnnotations.length > 0 ? Math.ceil(rowAnnotations.length / 8) : 0;

  return (
        <div
            className={classNames(
              "grid grid-cols-subgrid",
              wells > 96 && "content-between py-1",
              numRowAnnotationCols > 1 && `col-span-${numRowAnnotationCols}`,
              "text-noir-600 dark:text-noir-300",
            )}
          >
            {Array.from({length : rows}).map((_, index) => {
                // Minimum columns is 2
                const numCols = Math.max(rowAnnotations?.length || 0, 8)

                return (
                  <div className='grid' style={{
                    gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`
                  }}>
                    {rowAnnotations.map((rowAnn) => {
                      if (rowAnn.rows.includes(index)) {
                        return (
                          <div
                            key={index}
                            className={rowAnn.className + " " + (activeAnn === rowAnn ? "opacity-100" : "opacity-50")}
                            onMouseEnter={() => {
                              setActiveAnn(rowAnn)
                            }}
                            onMouseLeave={() => {
                              setActiveAnn(null)
                            }}
                          ></div>);
                      } else {
                        return (<div key={index}></div>);
                      }
                    })}
                  </div>
                );
              }
            )}

          </div>
  );
}
