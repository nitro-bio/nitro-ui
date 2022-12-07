import Graphviz from "graphviz-react";
import "./Graphviz.css";
import { Suspense, useMemo } from "react";
import { Gene } from "./types";
export const MetabolicNetwork = ({
  genes,
  currentGene,
}: {
  genes: Gene[];
  currentGene: Gene | null;
}) => {
  const randomGraph = useMemo(
    () => generateRandomGeneGraph(genes),
    [genes.length]
  );
  return (
    <Suspense fallback={`Loading...`}>
      <Graphviz dot={randomGraph} />
      <style></style>
    </Suspense>
  );
};

function generateRandomGeneGraph(genes: Gene[]) {
  /* conver the above into a list of gene to gene pairs */
  const pairs: [Gene, Gene][] = [
    [
      {
        id: 8,
        label: "gene9",
      },
      {
        id: 9,
        label: "gene10",
      },
    ],
    [
      {
        id: 5,
        label: "gene6",
      },
      {
        id: 8,
        label: "gene9",
      },
    ],
    [
      {
        id: 1,
        label: "gene2",
      },
      {
        id: 5,
        label: "gene6",
      },
    ],
    [
      {
        id: 6,
        label: "gene7",
      },
      {
        id: 1,
        label: "gene2",
      },
    ],
    [
      {
        id: 3,
        label: "gene4",
      },
      {
        id: 6,
        label: "gene7",
      },
    ],
    [
      {
        id: 4,
        label: "gene5",
      },
      {
        id: 1,
        label: "gene2",
      },
    ],
    [
      {
        id: 5,
        label: "gene6",
      },
      {
        id: 7,
        label: "gene8",
      },
    ],
    [
      {
        id: 0,
        label: "gene1",
      },
      {
        id: 6,
        label: "gene7",
      },
    ],
    [
      {
        id: 2,
        label: "gene3",
      },
      {
        id: 0,
        label: "gene1",
      },
    ],
    [
      {
        id: 3,
        label: "gene4",
      },
      {
        id: 4,
        label: "gene5",
      },
    ],
    [
      {
        id: 6,
        label: "gene7",
      },
      {
        id: 9,
        label: "gene10",
      },
    ],
    [
      {
        id: 4,
        label: "gene5",
      },
      {
        id: 6,
        label: "gene7",
      },
    ],
    [
      {
        id: 5,
        label: "gene6",
      },
      {
        id: 7,
        label: "gene8",
      },
    ],
    [
      {
        id: 3,
        label: "gene4",
      },
      {
        id: 8,
        label: "gene9",
      },
    ],
    [
      {
        id: 6,
        label: "gene7",
      },
      {
        id: 1,
        label: "gene2",
      },
    ],
  ];
  let dot = `digraph G {
		`;
  genes.forEach((gene) => {
    dot += `${gene.id} [id="${gene.label}" label="${gene.label}"];`;
  });
  pairs.forEach((pair) => {
    dot += `${pair[0].id} -> ${pair[1].id};`;
  });

  dot += `}`;
  console.log(pairs);
  console.log(dot);
  return dot;
}
