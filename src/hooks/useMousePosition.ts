import { useState, useEffect } from "react";

// from https://www.joshwcomeau.com/snippets/react-hooks/use-mouse-position/
export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  useEffect(function wireUpListener() {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  return { mousePosition };
};
