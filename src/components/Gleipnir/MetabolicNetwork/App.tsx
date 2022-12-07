import {
  DragEvent,
  DragEventHandler,
  MouseEvent,
  useEffect,
  useState,
} from "react";
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
import Sidebar from "./Sidebar";
import useAutoLayout, { Direction } from "./useAutoLayout";

import "reactflow/dist/style.css";

import { GENES } from "../types";
import styles from "./styles.module.css";

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

type ExampleProps = {
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

const initialEdges: Edge[] = [];
GENES.forEach((gene, index) => {
  if (index < GENES.length - 1) {
    initialEdges.push({
      id: `${gene.id}-${GENES[index + 1].id}`,
      source: gene.id,
      target: GENES[index + 1].id,
    });
  }
});
console.log(initialNodes);
console.log(initialEdges);
/**
 * This example shows how you can automatically arrange your nodes after adding child nodes to your graph.
 */
function ReactFlowPro({ direction = "TB" }: ExampleProps) {
  // this hook handles the computation of the layout once the elements or the direction changes
  const { fitView } = useReactFlow();

  useAutoLayout({ direction });
  const [nodes, setNodes] = useState<Node<NodeData>[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  // this function adds a new node and connects it to the source node
  const createConnection = (sourceId: string) => {
    // create an incremental ID based on the number of elements already in the graph
    const targetId = `${nodes.length + 1}`;

    const targetNode: Node<NodeData> = {
      id: targetId,
      data: { label: `Node ${targetId}` },
      position: { x: 0, y: 0 }, // no need to pass a position as it is computed by the layout hook
      type: "custom",
      style: { opacity: 0 },
    };

    const connectingEdge: Edge = {
      id: `${sourceId}->${targetId}`,
      source: sourceId,
      target: targetId,
      style: { opacity: 0 },
    };

    setNodes((nodes) => nodes.concat([targetNode]));
    setEdges((edges) => edges.concat([connectingEdge]));
  };

  // this function is called once the node from the sidebar is dropped onto a node in the current graph
  const onDrop: DragEventHandler = (evt: DragEvent<HTMLDivElement>) => {
    // make sure that the event target is a DOM element
    if (evt.target instanceof Element) {
      // from the target element search for the node wrapper element which has the node id as attribute
      const targetId = evt.target
        .closest(".react-flow__node")
        ?.getAttribute("data-id");

      if (targetId) {
        // now we can create a connection to the drop target node
        createConnection(targetId);
      }
    }
  };

  // this function is called when a node in the graph is clicked
  // enables a second possibility to add nodes to the canvas
  const onNodeClick: NodeMouseHandler = (
    _: MouseEvent,
    node: Node<NodeData>
  ) => {
    // on click, we want to add create a new node connection the clicked node
    createConnection(node.id);
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
  }, [nodes, fitView]);

  return (
    <div className={styles.container}>
      <Sidebar />
      <ReactFlow
        className={styles.reactFlow}
        proOptions={proOptions}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        onDrop={onDrop}
        onNodeClick={onNodeClick}
        // newly added edges get these options automatically
        defaultEdgeOptions={defaultEdgeOptions}
        minZoom={-Infinity}
        maxZoom={Infinity}
      />
    </div>
  );
}

// as we are accessing the internal React Flow state in our component, we need to wrap it with the ReactFlowProvider
const ReactFlowWrapper = (props: ExampleProps) => {
  return (
    <ReactFlowProvider>
      <ReactFlowPro {...props} />
    </ReactFlowProvider>
  );
};

export default ReactFlowWrapper;
