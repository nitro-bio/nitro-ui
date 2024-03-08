import { Card } from "@ui/Card";
import { Plate } from "./Plate";

export default {
  title: "Plate/Plate",
  component: Plate,
};

export const TwentyFour = () => {
  return (
    <Card className="max-w-3xl">
      <Plate
        wells={24}
        selection={null}
        setSelection={function (selection) {
          console.log(selection);
        }}
      />
    </Card>
  );
};
export const FourtyEight = () => {
  return (
    <Card className="max-w-3xl">
      <Plate
        wells={48}
        selection={null}
        setSelection={function (selection) {
          console.log(selection);
        }}
      />
    </Card>
  );
};

export const NinetySix = () => {
  return (
    <Card className="max-w-3xl">
      <Plate
        wells={96}
        selection={null}
        setSelection={function (selection) {
          console.log(selection);
        }}
      />
    </Card>
  );
};

export const ThreeEightyFour = () => {
  return (
    <Card className="max-w-3xl">
      <Plate
        wells={384}
        selection={null}
        setSelection={function (selection) {
          console.log(selection);
        }}
      />
    </Card>
  );
};
