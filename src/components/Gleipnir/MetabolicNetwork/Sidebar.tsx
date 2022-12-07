import React, { DragEvent } from "react";

import styles from "./styles.module.css";

function Sidebar() {
  const onDragStart = (nodeData: any) => (event: DragEvent) => {
    const dataString = JSON.stringify(nodeData);
    event.dataTransfer.setData("application/reactflow", dataString);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarLabel}>
        You can drag nodes from the sidebar and drop them on another node
      </div>
      <div>
        <div
          onDragStart={onDragStart({})}
          draggable
          className={styles.sidebarNode}
        >
          Node A
        </div>
        <div onDragStart={onDragStart} draggable className={styles.sidebarNode}>
          Node B
        </div>
        <div onDragStart={onDragStart} draggable className={styles.sidebarNode}>
          Node C
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
