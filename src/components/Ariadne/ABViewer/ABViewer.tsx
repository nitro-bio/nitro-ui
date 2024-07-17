import { AnnotatedBase, AnnotatedSequence } from "@Ariadne/types";
import { classNames } from "@utils/stringUtils";
import { z } from "zod";

export const ABDataSchema = z.object({
  pos: z.number(),
  ref: z.string(),
  reads_all: z.number(),
  matches: z.number(),
  A: z.number(),
  C: z.number(),
  T: z.number(),
  G: z.number(),
});
export type ABData = z.infer<typeof ABDataSchema>;

export const getABData = (reference: string): ABData[] => {
  const randint = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const uniform = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const bases = ["A", "C", "G", "T"] as const;

  const maxReads = 1000;
  const regionSize = Math.floor(reference.length / 10);

  const coverageData: ABData[] = [];

  for (let i = 0; i < reference.length; i++) {
    const regionFactor = Math.sin((i / regionSize) * Math.PI) > 0 ? 1.5 : 0.5;
    const baseReads = Math.floor(
      ((maxReads * randint(1, 10)) / 10) * regionFactor,
    );
    const data = {
      pos: i + 1,
      reads_all: maxReads,
      matches: Math.floor(0.7 * baseReads),
      ref: reference[i],
      A: NaN,
      C: NaN,
      T: NaN,
      G: NaN,
    };

    bases.forEach((base) => {
      data[base] = Math.floor(
        baseReads * (base === reference[i] ? 0.7 : uniform(0.0, 0.3)),
      );
    });

    coverageData.push(ABDataSchema.parse(data));
  }
  return coverageData;
};

const BaseReadsCol = ({
  nuclDatum,
  maxReads,
  i,
}: {
  nuclDatum: ABData;
  maxReads: number;
  i: number;
}) => {
  const base_reads_style_map = [
    { base: "G", reads: nuclDatum.G, style: "bg-rose-400 hover:bg-rose-600" },
    { base: "A", reads: nuclDatum.A, style: "bg-amber-400 hover:bg-amber-600" },
    {
      base: "T",
      reads: nuclDatum.T,
      style: "bg-emerald-400 hover:bg-emerald-600",
    },
    { base: "C", reads: nuclDatum.C, style: "bg-blue-400 hover:bg-blue-600" },
  ].sort((a, b) => a.reads - b.reads);

  return (
    <div
      className="flex h-12 w-full cursor-default flex-col justify-end"
      key={`base-${i}-coverage-wrapper`}
    >
      {base_reads_style_map.map(({ base, reads, style }) => (
        <div
          className={classNames(
            "mr-px font-mono text-transparent",
            style,
            `base-${i}-${base}-content`,
          )}
          title={`${base}: ${reads}`}
          style={{ height: `${(reads / maxReads) * 100}%` }}
          key={`base-${i}-${base}-content`}
        >
          {nuclDatum.ref}
        </div>
      ))}
    </div>
  );
};

export const ABViewer = ({
  data,
  sequence,
  className,
}: {
  data: ABData[];
  sequence: AnnotatedSequence;
  className?: string;
}) => {
  const max_reads = Math.max(...data.map((covDatum) => covDatum.reads_all));

  return (
    <div className={classNames("flex overflow-hidden", className)}>
      {sequence.map((nucl: AnnotatedBase, i: number) => {
        const nuclDatum = data.find((d) => d.pos === nucl.index + 1);
        if (!nuclDatum) return null;

        return (
          <BaseReadsCol
            nuclDatum={nuclDatum}
            maxReads={max_reads}
            i={i}
            key={`base-${nuclDatum.pos}-reads-col`}
          />
        );
      })}
    </div>
  );
};
