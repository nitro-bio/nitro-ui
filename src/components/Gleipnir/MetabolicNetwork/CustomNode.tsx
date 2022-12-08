import React, { useState, DragEvent } from "react";
import { Handle, NodeProps, Position } from "reactflow";

import styles from "./styles.module.css";
import { classNames } from "@utils/stringUtils";

function CustomNode({ data, sourcePosition, targetPosition }: NodeProps) {
  const [isDropzoneActive, setDropzoneActive] = useState<boolean>(false);

  const onDrop = () => {
    setDropzoneActive(false);
  };

  const onDragOver = (evt: DragEvent<HTMLDivElement>) => {
    evt.preventDefault();
  };

  const onDragEnter = () => {
    setDropzoneActive(true);
  };

  const onDragLeave = () => {
    setDropzoneActive(false);
  };

  return (
    <div
      className={classNames(
        "rounded-full bg-brand-600 p-4 text-white shadow-lg",
        isDropzoneActive ?? "bg-brand-700 shadow-xl"
      )}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
    >
      <Handle
        className={styles.handle}
        type="target"
        position={targetPosition || Position.Top}
      />
      <Handle
        className={styles.handle}
        type="source"
        position={sourcePosition || Position.Bottom}
      />
      {data.label}
    </div>
  );
}

export default CustomNode;
