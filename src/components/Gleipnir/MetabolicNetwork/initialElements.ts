import { Node, Edge } from "reactflow";

export const nodes: Node[] = [
  {
    type: "custom",
    id: "1",
    data: { label: "Node 1" },
    position: { x: 0, y: 0 },
  },
  {
    type: "custom",
    id: "2",
    data: { label: "Node 2" },
    position: { x: 0, y: 0 },
  },
  {
    type: "custom",
    id: "3",
    data: { label: "Node 3" },
    position: { x: 0, y: 0 },
  },
];

export const edges: Edge[] = [
  {
    id: "1->2",
    source: "1",
    target: "2",
  },
  {
    id: "1->3",
    source: "1",
    target: "3",
  },
];
