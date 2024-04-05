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
      ]}
    />
  );
};
