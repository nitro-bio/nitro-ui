import { MouseEvent, useEffect, useMemo, useState } from "react";
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

import { Gene, Reaction } from "../types";
import CustomEdge from "./CustomEdge";
import styles from "./styles.module.css";

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
  genes: Gene[];
  currentGene: Gene | null;
  setCurrentGene: (gene: Gene) => void;
  reactions: Reaction[];
  direction?: Direction;
};

type NodeData = Gene;

const edgeTypes = {
  custom: CustomEdge,
};

/**
 * This example shows how you can automatically arrange your nodes after adding child nodes to your graph.
 */
function ReactFlowPro({
  direction = "TB",
  genes,
  currentGene,
  setCurrentGene,
  reactions,
}: MetabolicNetworkProps) {
  // this hook handles the computation of the layout once the elements or the direction changes
  const { fitView } = useReactFlow();
  const nodeTypes: NodeTypes = useMemo(() => {
    return {
      custom: (args) => <CustomNode {...args} currentGene={currentGene} />,
    };
  }, [currentGene]);

  useAutoLayout({ direction });

  const initialNodes: Node[] = genes.map((gene) => ({
    id: gene.id,
    type: "custom",
    data: { label: gene.label, description: gene.description },
    position: { x: 0, y: 0 },
  }));

  const initialEdges: Edge[] = reactions.map((edge) => {
    const source = edge.source;
    const target = edge.target;

    return {
      id: `${source}-${target}`,
      ...defaultEdgeOptions,
      data: { label: edge.fwdProduct },
      type: "custom",
      source,
      target,
    };
  });

  const [nodes, setNodes] = useState<Node<NodeData>[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodeClick: NodeMouseHandler = (
    _: MouseEvent,
    node: Node<NodeData>
  ) => {
    const newCurrentGene = {
      id: node.id,
      label: node.data.label,
      description: node.data.description,
    };
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
