import { getRndInteger } from "@utils/mathUtils";
import { BlastResponseDatum } from "./types";

export const generateBlastResults = (args: { sequence: string }) => {
  const { sequence } = args;
  return [
    {
      title: "GRCh38.p14 Primary Assembly",
      subtitle: "Homo sapiens chromosome 18",
      sequenceId: "NC_000018.10",
    },
    {
      title: "Alternate Assembly T2T-CHM13v2.0",
      subtitle: "Homo sapiens isolate CHM13 chromosome 7",
      sequenceId: "NC_060931.1",
    },
    {
      title: "GRCm39 strain C57BL/6J",
      subtitle: "Mus musculus chromosome 13",
      sequenceId: "NC_000018.10",
    },
    {
      title: "Strain BN/NHsdMcwi, mRatBN7.2",
      subtitle: "Rattus norvegicus chromosome 17",
      sequenceId: "NC_051352.1",
    },
    {
      title: "Dictyoglomus turgidum DSM 6724",
      subtitle: "Complete Sequence",
      sequenceId: "NC_011661.1",
    },
  ]
    .map(genSingleResultFromMetadata())
    .sort((a, b) => (a.score > b.score ? -1 : 1));

  function genSingleResultFromMetadata(): (
    value: { title: string; subtitle: string; sequenceId: string },
    index: number,
    array: { title: string; subtitle: string; sequenceId: string }[]
  ) => BlastResponseDatum {
    return (metadata, i) => {
      const { title, subtitle, sequenceId } = metadata;
      let start = getRndInteger(0, sequence.length);
      let end = getRndInteger(start, sequence.length);
      /* if our result is too small, we pin to 30% of sequence.length and gen a random end idx  */
      if (end - start <= 0.15 * sequence.length) {
        start = Math.round(0.15 * sequence.length);
        end = getRndInteger(start * 2, sequence.length);
      }

      const trimmedQuery = sequence.slice(start, end);

      const generateTargetString = (query: string) => {
        const errorRate = getRndInteger(1, 80) / 100;
        const newString = query.split("");
        return newString
          .map((x) => {
            if (!!errorRate && Math.random() <= errorRate) {
              const randIdx = getRndInteger(0, query.length);
              return query[randIdx];
            }
            return x;
          })
          .join("");
      };

      const target = generateTargetString(trimmedQuery);

      const targetStart = getRndInteger(0, 10000);
      const targetRange = [targetStart, targetStart + target.length] as [
        number,
        number
      ];

      const generateMidline = (query: string, target: string) =>
        query
          .split("")
          .map((queryChar: string, i: number) => {
            const targetChar = target[i];
            if (targetChar === queryChar) {
              return "|";
            }
            return "X";
          })
          .join("");
      const midline = generateMidline(trimmedQuery, target);

      const score = getRndInteger(0, 100);

      return {
        id: `result-${i}`,
        queryRange: [start, end] as [number, number],
        identities: getRndInteger(0, 100),
        positives: getRndInteger(0, 100),
        gaps: getRndInteger(0, 100),
        frame: getRndInteger(-3, 3),
        query: trimmedQuery,
        score,
        sequenceId,
        title,
        subtitle,
        midline,
        target,
        targetRange,
      };
    };
  }
};
