import { useEffect, useState } from "react";

// add initRDKitModule() to window
declare global {
  interface Window {
    initRDKitModule: () => Promise<any>;
    RDKit: any;
  }
}

export const RDKitComponent = () => {
  const loaded = useRDKit();
  return (
    <>
      <div>{loaded ? <p>RDKit is loaded!</p> : <p>Loading RDKit...</p>}</div>
      {loaded && <RDKitDraw smiles="CC(=O)Oc1ccccc1C(=O)O" />}
    </>
  );
};

const RDKitDraw = ({ smiles }: { smiles: string }) => {
  const mol = window.RDKit.get_mol(smiles);
  const svg = mol.get_svg();
  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
};

const useRDKit = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Only attempt to load the script if it's not already present
    if (!document.querySelector("script#rdkit-loader")) {
      const script = document.createElement("script");
      script.id = "rdkit-loader";
      script.src = "https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js";
      script.async = true;

      script.onload = () => {
        window
          .initRDKitModule()
          .then((RDKit) => {
            console.log("RDKit version: " + RDKit.version());
            window.RDKit = RDKit;
            setLoaded(true);
          })
          .catch(() => {
            console.error("Failed to load RDKit module");
          });
      };

      document.head.appendChild(script);

      return () => {
        // Cleanup the script when the hook's effect cleans up
        document.head.removeChild(script);
      };
    } else {
      // If the script is already loaded, directly set loaded to true
      // You might also want to check if window.RDKit is already defined
      // and initialized to avoid unnecessary re-init
      if (window.RDKit) {
        setLoaded(true);
      }
    }
  }, [setLoaded]);
  return loaded;
};

export default RDKitComponent;
