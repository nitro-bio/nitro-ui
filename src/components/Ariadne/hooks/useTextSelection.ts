import { useRef, useState, useEffect } from "react";
// from https://storybook.react-laag.com/?path=/docs/text-selection--page
export function useTextSelection() {
  // we need a reference to the element wrapping the text in order to determine
  // if the selection is the selection we are after
  const ref = useRef<Node>();

  // we store info about the current Range here
  const [range, setRange] = useState<Range | undefined | null>(undefined);

  // In this effect we're registering for the documents "selectionchange" event
  useEffect(() => {
    function handleChange() {
      // get selection information from the browser
      const selection = window.getSelection();

      // we only want to proceed when we have a valid selection
      if (
        !selection ||
        selection.isCollapsed ||
        !ref.current ||
        !selection.containsNode(ref.current, true)
      ) {
        setRange(undefined);
        return;
      }

      setRange(selection.getRangeAt(0));
    }

    document.addEventListener("selectionchange", handleChange);
    return () => document.removeEventListener("selectionchange", handleChange);
  }, []);

  return { range, ref };
}
