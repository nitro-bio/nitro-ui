import { Card } from "..";
import RDKitComponent from "./ChemicalViewer";

export default {
  title: "MoleculeViewer/ChemicalViewer",
};

export const Default = () => {
  return (
    <Card className="w-fit px-4 py-2">
      <RDKitComponent
        loadingPlaceholder={"Loading..."}
        smiles={"CC(=O)Oc1ccccc1C(=O)O"}
      />
    </Card>
  );
};
export const Styled = () => {
  return (
    <Card className="w-fit px-4 py-2">
      <RDKitComponent
        loadingPlaceholder={"Loading..."}
        containerClassName="bg-sky-800 rounded-xl p-8 group hover:bg-emerald-800 transition-all duration-300 ease-in-out"
        svgClassName="text-emerald-300 group-hover:text-sky-300 group-hover:scale-110 transition-all duration-300 ease-in-out"
        smiles={"CC(=O)Oc1ccccc1C(=O)O"}
      />
    </Card>
  );
};
