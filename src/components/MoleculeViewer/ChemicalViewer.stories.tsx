import { useState } from "react";
import { classNames } from "@utils/stringUtils";
import RDKitComponent from "./ChemicalViewer";

export default {
  title: "MoleculeViewer/ChemicalViewer",
};

export const Default = () => {
  return <RDKitComponent />;
};
