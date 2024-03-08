import { classNames } from "@utils/stringUtils";
import { useState } from "react";
import { Coor, useLinearSelectionRect } from "../..";

export const PlateSelectionOverlay = ({
  plateRef,
  wellBoxes,
  toggleSelection,
}: {
  plateRef: React.RefObject<HTMLDivElement>;
  wellBoxes: DOMRect[];
  toggleSelection: (wells: Set<number>) => void;
}) => {
  const [active, setActive] = useState(false);
  const onMouseMove = () => {
    setActive(true);
  };
  const onMouseUp = ({
    start,
    end,
    wellBoxes,
  }: {
    start: Coor;
    end: Coor;
    wellBoxes: DOMRect[];
  }) => {
    setActive(false);
    if (!plateRef.current) {
      return;
    }
    const intersecting = findIntersectingWells({
      start,
      end,
      wellBoxes,
    });
    if (intersecting.size === 0) {
      return;
    }
    toggleSelection(intersecting);
  };
  const { start, end } = useLinearSelectionRect({
    ref: plateRef,
    onMouseUp: (payload) => onMouseUp({ ...payload, wellBoxes }),
    onMouseMove,
  });

  if (!start || !end || !wellBoxes) {
    return null;
  }
  const style = {
    top: start.y,
    left: start.x,
    width: Math.abs(end.x - start.x),
    height: Math.abs(end.y - start.y),
  };
  // handle negative width/height
  if (end.x < start.x) {
    style.left = end.x;
  }
  if (end.y < start.y) {
    style.top = end.y;
  }

  return (
    <>
      {start && end && (
        <div
          className={classNames(
            "absolute border-2 border-brand-500 bg-brand-700 opacity-10 dark:bg-brand-200",
            active ? "absolute" : "hidden",
          )}
          style={style}
        />
      )}
    </>
  );
};
type Box = { left: number; top: number; right: number; bottom: number };

function findIntersectingWells({
  start,
  end,
  wellBoxes,
}: {
  start: Coor | null;
  end: Coor | null;
  wellBoxes: DOMRect[];
}) {
  const intersecting = new Set<number>([]);
  if (start === null || end === null) {
    console.error("start or end is null");
    return intersecting;
  }
  const selectionBox = {
    left: Math.min(start.x, end.x),
    top: Math.min(start.y, end.y),
    right: Math.max(start.x, end.x),
    bottom: Math.max(start.y, end.y),
  };

  const selectionArea =
    (selectionBox.right - selectionBox.left) *
    (selectionBox.bottom - selectionBox.top);

  if (selectionArea < 200) {
    console.warn("Selection area too small");
    return intersecting;
  }

  wellBoxes.forEach((box, idx) => {
    if (isIntersecting(selectionBox, box)) {
      intersecting.add(idx);
    } else {
      //   left: box.left,
      //   top: box.top,
      //   right: box.right,
      //   bottom: box.bottom,
      // });
    }
  });

  return intersecting;
}

function isIntersecting(boxA: Box, boxB: Box) {
  return !(
    boxB.left > boxA.right ||
    boxB.right < boxA.left ||
    boxB.top > boxA.bottom ||
    boxB.bottom < boxA.top
  );
}
