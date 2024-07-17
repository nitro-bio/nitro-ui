import { useStateRef } from "@Ariadne/hooks/useStateRef";
import { classNames } from "@utils/stringUtils";
import { useEffect, useRef, useState } from "react";
import { Coor } from "../..";

const INACTIVE_AREA_THRESHOLD = 500;
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
  const boxRef = useRef<
    | {
        top: number;
        left: number;
        width: number;
        height: number;
      }
    | undefined
  >(undefined);

  const onMouseMove = ({ start, end }: { start: Coor; end: Coor }) => {
    setActive(true);
    const offset = getElementOffset(plateRef);
    // find absolute position of selection box
    const top = Math.min(start.y, end.y) + offset.top;
    const left = Math.min(start.x, end.x) + offset.left;
    const width = Math.abs(end.x - start.x);
    const height = Math.abs(end.y - start.y);
    boxRef.current = { top, left, width, height };
  };

  const onMouseUp = ({ wellBoxes }: { wellBoxes: DOMRect[] }) => {
    setActive(false);
    if (!plateRef.current || !boxRef.current) {
      return;
    }
    const offset = getElementOffset(plateRef);
    const intersecting = findIntersectingWells({
      start: {
        x: boxRef.current.left - offset.left,

        y: boxRef.current.top - offset.top,
      },
      end: {
        x: boxRef.current.left + boxRef.current.width - offset.left,
        y: boxRef.current.top + boxRef.current.height - offset.top,
      },

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
    parentRef: plateRef,
  });

  if (!start || !end || !wellBoxes) {
    return null;
  }
  const area = Math.abs((end.x - start.x) * (end.y - start.y));
  return (
    <>
      {start && end && (
        <div
          className={classNames(
            "border-2  text-white ",
            area < INACTIVE_AREA_THRESHOLD
              ? "border-red-400/10 bg-red-700/10 dark:bg-red-300/10"
              : "border-brand-500/10 bg-brand-700/10  dark:bg-brand-200/10",
            active ? "fixed" : "hidden",
          )}
          style={boxRef?.current}
        >
          <p className="absolute left-0 top-0 hidden text-white opacity-100">
            Start: {JSON.stringify(start)}
          </p>
          <p className="absolute bottom-0 right-0 hidden text-white opacity-100">
            End: {JSON.stringify(end)}
          </p>
        </div>
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

  if (selectionArea < 50) {
    console.warn("Selection area too small, ignoring selection");
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
  parentRef,
}: {
  onMouseUp?: (payload: { start: Coor; end: Coor }) => void;
  onMouseDown?: (payload: { start: Coor }) => void;
  onMouseMove?: (payload: { start: Coor; end: Coor }) => void;
  parentRef?: React.RefObject<HTMLElement>;
}) => {
  const [start, setStart, startRef] = useStateRef<Coor | null>(null);
  const [end, setEnd, endRef] = useStateRef<Coor | null>(null);
  const active = useRef(false);

  const _onMouseDown = (e: MouseEvent) => {
    if (!parentRef?.current) return;
    const offset = getElementOffset(parentRef);
    const relativeX = e.clientX - offset.left;
    const relativeY = e.clientY - offset.top;
    setStart({ x: relativeX, y: relativeY });
    active.current = true;
    onMouseDown?.({ start: { x: relativeX, y: relativeY } });
  };
  const _onMouseUp = () => {
    active.current = false;
    if (startRef.current && endRef.current) {
      onMouseUp?.({ start: startRef.current, end: endRef.current });
    } else {
      console.error("start or end is null when mouseup");
    }
  };

  // must use refs in event handlers to get most up to date values
  const _onMouseMove = (e: MouseEvent) => {
    if (active.current && parentRef?.current) {
      const offset = getElementOffset(parentRef);
      const relativeX = e.clientX - offset.left;
      const relativeY = e.clientY - offset.top;
      setEnd({ x: relativeX, y: relativeY });
      if (!startRef.current) {
        console.error("start is null when mousemove");
        return;
      }
      onMouseMove?.({
        start: startRef.current,
        end: { x: relativeX, y: relativeY },
      });
    }
  };
  useEffect(() => {
    const element = parentRef?.current;
    if (element) {
      element.addEventListener("mousedown", _onMouseDown);
      element.addEventListener("mousemove", _onMouseMove);
      window.addEventListener("mouseup", _onMouseUp); // mouseup on window to handle drag end outside of element
    }
    return () => {
      element?.removeEventListener("mousedown", _onMouseDown);
      element?.removeEventListener("mousemove", _onMouseMove);
      window.removeEventListener("mouseup", _onMouseUp);
    };
  }, [parentRef?.current]);
  return { start, end };
};

const getElementOffset = (parentRef: React.RefObject<HTMLElement>) => {
  const rect = parentRef?.current?.getBoundingClientRect();
  return rect
    ? { left: rect.left + window.scrollX, top: rect.top + window.scrollY }
    : { left: 0, top: 0 };
};
