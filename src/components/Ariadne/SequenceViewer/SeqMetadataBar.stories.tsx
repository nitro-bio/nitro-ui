import { generateRandomSequences } from "@Ariadne/storyUtils";
import { useMemo, useState } from "react";

import { SequenceViewer } from ".";
import type { AriadneSelection } from "../types";
import { SeqMetadataBar } from "./SeqMetadataBar";

export default {
  title: "Ariadne/SequenceViewer/SeqMetadataBar",
  component: SequenceViewer,
};

export const Default = () => {
  const [selection, setSelection] = useState<AriadneSelection | null>({
    start: 0,
    end: 2,
    direction: "forward",
  });
  const { sequences } = useMemo(
    () =>
      generateRandomSequences({
        maxSequences: 5,
        maxLength: 100,
      }),
    [],
  );

  return (
    <SeqMetadataBar
      sequences={sequences}
      selection={selection}
      setSelection={setSelection}
    />
  );
};
