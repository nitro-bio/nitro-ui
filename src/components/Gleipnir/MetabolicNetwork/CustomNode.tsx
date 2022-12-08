import React, { useState, DragEvent } from "react";
import { Handle, NodeProps, Position } from "reactflow";

import styles from "./styles.module.css";
import { classNames } from "@utils/stringUtils";
import { useAtom } from "jotai";
import { currentGeneAtom } from "../Gleipnir";

function CustomNode({ data, sourcePosition, targetPosition }: NodeProps) {
  const [isDropzoneActive, setDropzoneActive] = useState<boolean>(false);
  const [currentGene] = useAtom(currentGeneAtom);

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

  const isCurrent = currentGene?.id === data.label;
  console.log(isCurrent);
  return (
    <div
      className={classNames(
        "duration-400 rounded-full p-4 text-white shadow-lg transition-colors ease-in-out",
        isDropzoneActive && "bg-brand-400 shadow-xl",
        isCurrent ? "bg-green-700 shadow-xl" : "bg-brand-600"
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
