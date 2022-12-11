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
        "duration-400 w-full rounded-full bg-white p-4 text-center shadow-lg transition-all ease-in-out dark:bg-noir-600",
        isDropzoneActive && "shadow-xl",
        isCurrent
          ? "scale-110  border-2 border-brand-400 p-8 font-semibold text-brand-500 shadow-xl dark:border-brand-400 dark:text-brand-300"
          : "border  border-noir-700 text-noir-500 dark:border-noir-100 dark:text-noir-50 "
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
