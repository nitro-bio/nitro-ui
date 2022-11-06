import { generateResults } from "@Blast/blastUtils";
import ResultCard from "@Blast/ResultCard";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const results = generateResults({
  sequence: "TAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGC",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="h-screen dark max-w-7xl flex flex-col gap-4 justify-center">
      {results.map((result) => (
        <ResultCard result={result} sequenceType={"DNA"} />
      ))}
    </div>
  </React.StrictMode>
);
