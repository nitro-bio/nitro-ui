import { generateRandomAlignedSequences } from "@Ariadne/storyUtils";
import { useMemo, useState } from "react";

import { SequenceViewer } from ".";
import type { AriadneSelection } from "../types";
import { SeqMetadataBar } from "./SeqMetadataBar";
import { Card } from "@ui/Card";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
      generateRandomAlignedSequences({
        maxSequences: 5,
        maxLength: 100,
      }),
    [],
  );

  return (
    <Card>
      <SeqMetadataBar
        sequences={sequences}
        selection={selection}
        setSelection={setSelection}
        sequenceLabels={sequences.map((_, idx) => `Sequence ${idx + 1}`)}
      />
    </Card>
  );
};

export const Minimap = () => {
  const [selection, setSelection] = useState<AriadneSelection | null>({
    start: 0,
    end: 2,
    direction: "forward",
  });
  let sequences = [
    "TAAGTGCCTCATAGCGAGGTTTTGAGTCGCTTACCAGATCTGAGGTTATTACTCTGGCCGACGCTTGCGAGCCGTCATGTACAGGAAATACATCGTTCCT",
    "CGAGGTTTTGAGTCGCTTACCAGATCTGAGGTTATTACTCTGGCCGACGCTTGCGAGCCGTCATGTACAGGAAATACATCGTTCCT",
    "TGAGGTTCCGACGCTTGCGAGCCGTCATGTACAGGAAATACATCGTTCCT",
    "ATAGCGAGGTTTTGAGTCGCTTACCAGATCTGAGGTTATTACTCTGGCCGACGCTTGCGAGCCGTCATGTACAGGAAATACATCGTTCCT",
  ];
  sequences = sequences.map((seq) => seq.replaceAll(" ", ""));
  const [_sequences, _setSequences] = useState(sequences);
  const defaultCharClassName = ({ sequenceIdx }: { sequenceIdx: number }) => {
    if (sequenceIdx === 0) {
      return "dark:text-brand-300 text-brand-600";
    } else if (sequenceIdx === 1) {
      return "dark:text-indigo-300 text-indigo-600";
    } else if (sequenceIdx === 2) {
      return "dark:text-amber-300 text-amber-600";
    } else {
      return "dark:text-noir-300 text-noir-600";
    }
  };
  return (
    <QueryClientProvider
      client={
        new QueryClient({ defaultOptions: { queries: { retry: false } } })
      }
    >
      <Card>
        <SeqMetadataBar
          selection={selection}
          setSelection={setSelection}
          sequenceLabels={sequences.map((_, idx) => `Sequence ${idx + 1}`)}
          sequences={_sequences}
          setSequences={_setSequences}
        />
        <SequenceViewer
          sequences={_sequences}
          annotations={[]}
          selection={selection}
          charClassName={defaultCharClassName}
        />
      </Card>
    </QueryClientProvider>
  );
};
