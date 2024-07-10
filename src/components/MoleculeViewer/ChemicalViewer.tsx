import { classNames } from "@utils/stringUtils";
import { ReactNode, useEffect, useState } from "react";

// add initRDKitModule() to window
interface RDKitModule {
  version: () => string;
  get_mol: (smiles: string) => {
    get_svg: () => string;
  };
}
declare global {
  interface Window {
    initRDKitModule: () => Promise<RDKitModule>;
    RDKit: RDKitModule;
  }
}

export const RDKitComponent = ({
  smiles,
  loadingPlaceholder,
  containerClassName,
  svgClassName,
}: {
  smiles?: string;
  loadingPlaceholder: ReactNode;
  containerClassName?: string;
  svgClassName?: string;
}) => {
  const loaded = useRDKit();
  const ready = loaded && smiles !== undefined;
  return (
    <div className={classNames("h-full w-full", containerClassName)}>
      {!loaded && loadingPlaceholder}
      {ready && <RDKitDraw smiles={smiles} svgClassName={svgClassName} />}
    </div>
  );
};

const RDKitDraw = ({
  smiles,
  svgClassName,
}: {
  smiles: string;
  svgClassName?: string;
}) => {
  const mol = window.RDKit.get_mol(smiles);
  let svg = mol.get_svg();
  const svgClassNames = classNames("", svgClassName);
  // Replace fill and stroke colors with CSS variables
  svg = svg.replace(/fill:#FFFFFF/g, "fill:transparent");
  svg = svg.replace(/stroke:#000000/g, "stroke:currentColor");
  svg = svg.replace("<svg", `<svg class="${svgClassNames}"`);
  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
};

const useRDKit = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Only attempt to load the script if it's not already present
    if (document.querySelector("script#rdkit-loader")) {
      if (!window.RDKit) {
        const interval = setInterval(() => {
          if (window.RDKit) {
            setLoaded(true);
            clearInterval(interval);
          }
        }, 100);
      } else {
        setLoaded(true);
      }
    } else {
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
    }
  }, [setLoaded]);
  return loaded;
};

export default RDKitComponent;
