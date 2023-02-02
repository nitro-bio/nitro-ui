import { useEffect, useState } from "react";

// Hook
export const useDebounce = <T>({
  value,
  delay,
}: {
  value: T;
  delay: number;
}): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      const handler = setTimeout(() => {
        console.log("useDebounce: setting debounced value");
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
};
