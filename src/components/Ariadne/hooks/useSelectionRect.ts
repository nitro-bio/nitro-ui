import { Coor } from "@Ariadne/types";
import { RefObject, useEffect, useRef, useState } from "react";

export const useSelectionRect = (ref: RefObject<SVGSVGElement | null>) => {
  const [start, setStart] = useState<Coor | null>(null);
  const [end, setEnd] = useState<Coor | null>(null);

  const active = useRef(false);

  const onMouseDown = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top } = ref.current?.getBoundingClientRect() || {
      left: 0,
      top: 0,
    };
    const x = clientX - left;
    const y = clientY - top;

    active.current = true;

    setStart({ x, y });
  };
  const onMouseUp = () => {
    active.current = false;
  };

  const onMouseMove = (e: MouseEvent) => {
    if (active.current) {
      const { clientX, clientY } = e;
      const { left, top } = ref.current?.getBoundingClientRect() || {
        left: 0,
        top: 0,
      };
      const x = clientX - left;
      const y = clientY - top;
      setEnd({ x, y });
    }
  };
  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mousedown", onMouseDown);
      node.addEventListener("mousemove", onMouseMove);
      node.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      node?.removeEventListener("mousedown", onMouseDown);
      node?.removeEventListener("mousemove", onMouseMove);
      node?.removeEventListener("mouseup", onMouseUp);
    };
  }, [ref]);
  return { start, end };
};
