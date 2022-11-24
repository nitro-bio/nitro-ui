import { useCallback, useRef, useState } from "react";

export const useStateRef = <T>(initialValue: T) => {
  const ref = useRef<T>(initialValue);
  const [state, internalSetState] = useState<T>(initialValue);
  const setState = useCallback((value: T) => {
    ref.current = value;
    internalSetState(value);
  }, []);

  return [state, setState, ref] as const;
};
