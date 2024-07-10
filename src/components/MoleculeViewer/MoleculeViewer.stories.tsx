import { useState } from "react";
import { MoleculeViewer } from "./MoleculeViewer";
import { classNames } from "@utils/stringUtils";

export default {
  title: "MoleculeViewer/MoleculeViewer",
};

export const WithHiglights = () => {
  const highlights = [
    {
      // red
      label: "Red Annotation",
      hexColor: "#ff0000",
      start: 14,
      end: 30,
    },
    {
      // blue
      label: "Blue Annotation",
      hexColor: "#0000ff",
      start: 0,
      end: 10,
    },
  ];
  const [currentHighlightType, setCurrentHighlightType] = useState<
    "red" | "blue"
  >("red");
  const currentHighlight =
    currentHighlightType === "red" ? highlights[0] : highlights[1];
  return (
    <>
      <button
        className={classNames(
          "btn btn-sm mb-2 text-white",
          currentHighlightType === "red" ? "bg-blue-600" : "bg-red-600",
        )}
        onClick={() =>
          setCurrentHighlightType((prev) => (prev === "red" ? "blue" : "red"))
        }
      >
        {currentHighlightType === "red" ? "Show Blue" : "Show Red"}
      </button>
      <MoleculeViewer
        className="min-h-80"
        pdbUrl="https://files.rcsb.org/download/1CRN.pdb"
        highlights={[currentHighlight]}
      />
    </>
  );
};
