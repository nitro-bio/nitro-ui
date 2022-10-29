import { getRndInteger } from "@utils/mathUtils";
export interface BlastResponseDatum {
  id: string;
  query_range: [number, number];
  target_range: [number, number];
  score: number;
  identities: number;
  positives: number;
  gaps: number;
  frame: number;
  sequence_id: string;
  title: string;
  subtitle: string;
  target: string;
  query: string;
  midline: string;
}

export const generateResults = (args: { sequence: string }) => {
  const { sequence } = args;
  return [
    {
      title: "GRCh38.p14 Primary Assembly",
      subtitle: "Homo sapiens chromosome 18",
      sequence_id: "NC_000018.10",
    },
    {
      title: "Alternate Assembly T2T-CHM13v2.0",
      subtitle: "Homo sapiens isolate CHM13 chromosome 7",
      sequence_id: "NC_060931.1",
    },
    {
      title: "GRCm39 strain C57BL/6J",
      subtitle: "Mus musculus chromosome 13",
      sequence_id: "NC_000018.10",
    },
    {
      title: "Strain BN/NHsdMcwi, mRatBN7.2",
      subtitle: "Rattus norvegicus chromosome 17",
      sequence_id: "NC_051352.1",
    },
    {
      title: "Dictyoglomus turgidum DSM 6724",
      subtitle: "Complete Sequence",
      sequence_id: "NC_011661.1",
    },
  ]
    .map(genSingleResultFromMetadata())
    .sort((a, b) => (a.score > b.score ? -1 : 1));

  function genSingleResultFromMetadata(): (
    value: { title: string; subtitle: string; sequence_id: string },
    index: number,
    array: { title: string; subtitle: string; sequence_id: string }[]
  ) => BlastResponseDatum {
    return (metadata, i) => {
      const { title, subtitle, sequence_id } = metadata;
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
            } else {
              return x;
            }
          })
          .join("");
      };

      const target = generateTargetString(trimmedQuery);

      const target_start = getRndInteger(0, 10000);
      const target_range = [target_start, target_start + target.length] as [
        number,
        number
      ];

      const generateMidline = (query: string, target: string) => {
        return query
          .split("")
          .map((queryChar: string, i: number) => {
            const targetChar = target[i];
            if (targetChar === queryChar) {
              return "|";
            } else {
              return "X";
            }
          })
          .join("");
      };
      const midline = generateMidline(trimmedQuery, target);

      const score = getRndInteger(0, 100);

      return {
        id: `${i}`,
        query_range: [start, end] as [number, number],
        identities: getRndInteger(0, 100),
        positives: getRndInteger(0, 100),
        gaps: getRndInteger(0, 100),
        frame: getRndInteger(-3, 3),
        query: trimmedQuery,
        score,
        sequence_id,
        title,
        subtitle,
        midline,
        target,
        target_range,
      };
    };
  }
};
