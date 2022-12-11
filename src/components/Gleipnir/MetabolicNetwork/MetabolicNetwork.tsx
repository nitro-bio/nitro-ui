import { MouseEvent, useEffect, useState } from "react";
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Edge,
  EdgeChange,
  MarkerType,
  Node,
  NodeChange,
  NodeMouseHandler,
  NodeTypes,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";

import CustomNode from "./CustomNode";

import useAutoLayout, { Direction } from "./useAutoLayout";

import "reactflow/dist/style.css";

import { GENES, PATHWAY } from "../types";
import styles from "./styles.module.css";
import { currentGeneAtom } from "../Gleipnir";
import { useAtom } from "jotai";
import CustomEdge from "./CustomEdge";

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const proOptions = {
  account: "paid-pro",
  hideAttribution: true,
};

const defaultEdgeOptions = {
  type: "smoothstep",
  markerEnd: { type: MarkerType.ArrowClosed },
  pathOptions: { offset: 5 },
};

type MetabolicNetworkProps = {
  direction?: Direction;
};

type NodeData = {
  label: string;
};

const initialNodes: Node[] = GENES.map((gene) => ({
  id: gene.id,
  type: "custom",
  data: { label: gene.label },
  position: { x: 0, y: 0 },
}));

const edgeTypes = {
  custom: CustomEdge,
};

const initialEdges: Edge[] = PATHWAY.map((edge) => {
  const source = edge.source;
  const target = edge.target;

  return {
    id: `${source}-${target}`,
    ...defaultEdgeOptions,
    data: edge.data,
    type: "custom",
    source,
    target,
  };
});

/**
 * This example shows how you can automatically arrange your nodes after adding child nodes to your graph.
 */
function ReactFlowPro({ direction = "TB" }: MetabolicNetworkProps) {
  // this hook handles the computation of the layout once the elements or the direction changes
  const { fitView } = useReactFlow();

  const [currentGene, setCurrentGene] = useAtom(currentGeneAtom);

  useAutoLayout({ direction });
  const [nodes, setNodes] = useState<Node<NodeData>[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodeClick: NodeMouseHandler = (
    _: MouseEvent,
    node: Node<NodeData>
  ) => {
    const newCurrentGene = {
      id: node.id,
      label: node.data.label,
    };
    console.log(newCurrentGene);
    setCurrentGene(newCurrentGene);
  };

  const onNodesChange: OnNodesChange = (changes: NodeChange[]) => {
    setNodes((nodes) => applyNodeChanges(changes, nodes));
  };

  const onEdgesChange: OnEdgesChange = (changes: EdgeChange[]) => {
    setEdges((edges) => applyEdgeChanges(changes, edges));
  };

  // every time our nodes change, we want to center the graph again
  useEffect(() => {
    fitView({ duration: 400 });
  }, [nodes]);

  return (
    <div className="flex h-full">
      <ReactFlow
        className={styles.reactFlow}
        proOptions={proOptions}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        onNodeClick={onNodeClick}
        zoomOnScroll={false}
        // newly added edges get these options automatically
        defaultEdgeOptions={defaultEdgeOptions}
        minZoom={-Infinity}
        maxZoom={Infinity}
      />
    </div>
  );
}

const MetabolicNetwork = (props: MetabolicNetworkProps) => {
  return (
    <div className="h-[800px]">
      <ReactFlowProvider>
        <ReactFlowPro {...props} />
      </ReactFlowProvider>
    </div>
  );
};

export default MetabolicNetwork;
