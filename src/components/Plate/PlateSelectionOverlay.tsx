import { useStateRef } from "@Ariadne/hooks/useStateRef";
import { classNames } from "@utils/stringUtils";
import { useEffect, useRef, useState } from "react";
import { Coor } from "../..";

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
  const { start, end } = useMouseRect({
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
            "border-2 border-brand-500 bg-brand-700 opacity-10 dark:bg-brand-200",
            active ? "fixed" : "hidden",
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

  if (selectionArea < 20) {
    console.warn("Selection area too small");
    return intersecting;
  }

  wellBoxes.forEach((box, idx) => {
    if (isIntersecting(selectionBox, box)) {
      intersecting.add(idx);
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

export const useMouseRect = ({
  onMouseUp,
  onMouseDown,
  onMouseMove,
}: {
  onMouseUp?: (payload: { start: Coor; end: Coor }) => void;
  onMouseDown?: (payload: { start: Coor }) => void;
  onMouseMove?: (payload: { start: Coor; end: Coor }) => void;
}) => {
  const [start, setStart, startRef] = useStateRef<Coor | null>(null);
  const [end, setEnd, endRef] = useStateRef<Coor | null>(null);
  const active = useRef(false);

  const _onMouseDown = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    console.log("mousedown", clientX, clientY);
    setStart({ x: clientX, y: clientY });
    setEnd({ x: clientX, y: clientY });
    active.current = true;
    onMouseDown?.({ start: { x: clientX, y: clientY } });
  };
  const _onMouseUp = () => {
    active.current = false;
    if (startRef.current && endRef.current) {
      console.log("mouseup", { start: startRef.current, end: endRef.current });

      onMouseUp?.({ start: startRef.current, end: endRef.current });
    } else {
      console.error("start or end is null when mouseup");
    }
  };

  // must use refs in event handlers to get most up to date values
  const _onMouseMove = (e: MouseEvent) => {
    if (active.current) {
      const { clientX, clientY } = e;
      setEnd({ x: clientX, y: clientY });
      if (startRef.current && endRef.current) {
        onMouseMove?.({ start: startRef.current, end: endRef.current });
      } else {
        console.error("start is null when mousemove called");
      }
    }
  };
  useEffect(function wireUpListener() {
    if (window) {
      // still want to call mouseup if mouse leaves parent
      window.addEventListener("mouseup", _onMouseUp);
      window.addEventListener("mousemove", _onMouseMove);
      window.addEventListener("mousedown", _onMouseDown);
    }
    return () => {
      window?.removeEventListener("mousedown", _onMouseDown);
      window?.removeEventListener("mousemove", _onMouseMove);
      window?.removeEventListener("mouseup", _onMouseUp);
    };
  });
  return { start, end };
};
