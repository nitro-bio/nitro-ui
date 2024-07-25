import React, { useState, useEffect } from "react";
import { RowAnnotation } from "@Ariadne/types";
import { classNames } from "@utils/stringUtils";
import { wellsToRowsCols } from "./utils";


export const RowAnnotationGutter = ({
  rowAnnotations,
  wells,
} : {
    rowAnnotations: RowAnnotation[]
    wells: 24 | 96 | 48 | 384
}) => {

  const [activeAnn, setActiveAnn] = useState<RowAnnotation | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { rows } = wellsToRowsCols(wells);

  const numRowAnnotationCols = rowAnnotations.length > 0 ? Math.ceil(rowAnnotations.length / 8) : 0;
  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (activeAnn) {
      window.addEventListener('mousemove', handleMouseMove);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [activeAnn]);

  if (!rowAnnotations || rowAnnotations.length === 0) {
    return null;
  }

  return (
    <>
      {activeAnn && (
        <div
          key='row-gutter-mouseover'
          className="absolute z-50 bg-noir-800 text-white p-2 rounded-lg"
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
        key='row-gutter-annotations'
        className={classNames(
          "grid",
          wells > 96 && "content-between py-1",
          numRowAnnotationCols > 1 && `col-span-${numRowAnnotationCols}`,
          "text-noir-600 dark:text-noir-300",
        )}
      >
        {Array.from({length : rows}).map((_, index) => {
            // Minimum columns is 2
            const numCols = Math.floor(rowAnnotations?.length / 8) * 8 + 8

            return (
              <div className='grid' key={index} style={{
                gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`
              }}>
                {rowAnnotations.map((rowAnn) => {
                  if (rowAnn.rows.includes(index)) {
                    return (
                      <div
                        key={'ra' + rowAnn.id + index}
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
    </>
  );
}
