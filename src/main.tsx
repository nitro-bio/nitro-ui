import { generateResults } from "@Blast/blastUtils";
import { ResultCard } from "@Blast/ResultCard";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const results = generateResults({
  sequence: "TAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGCTAGC",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="dark flex h-screen max-w-7xl flex-col justify-center gap-4">
      {results.map((result) => (
        <ResultCard key={result.id} result={result} sequenceType={"DNA"} />
      ))}
    </div>
  </React.StrictMode>,
);
