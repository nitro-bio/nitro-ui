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
      highlights={[
        {
          // red
          hexColor: "#ff0000",
          start: 14,
          end: 30,
        },
        {
          // blue
          hexColor: "#0000ff",
          start: 0,
          end: 10,
        },
      ]}
    />
  );
};
