import { MoleculeViewer } from ".";

export default {
  title: "MoleculeViewer/MoleculeViewer",
  component: MoleculeViewer,
};

export const Default = () => {
  return (
    <MoleculeViewer
      className="min-h-80"
      pdbUrl="https://files.rcsb.org/download/1CRN.pdb"
    />
  );
};
