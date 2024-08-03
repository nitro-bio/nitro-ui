import { CreditCardIcon, UserIcon } from "lucide-react";
import { Card } from "@ui/Card";
import { Dropdown, DropdownRadioGroup } from "@ui/Dropdown/Dropdown";
import { useState } from "react";

export default {
  title: "UIElements/Dropdown",
};

export function DropdownMenuDemo() {
  const [radioValue, setRadioValue] = useState<"Profile" | "Billing">(
    "Profile",
  );
  const [checkboxValues, setCheckboxValues] = useState<
    ("Profile" | "Billing")[]
  >(["Profile"]);
  const toggleCheckboxValue = (val: "Profile" | "Billing") => {
    if (checkboxValues.includes(val)) {
      setCheckboxValues(checkboxValues.filter((x) => x !== val));
    } else {
      setCheckboxValues([...checkboxValues, val]);
    }
  };
  const isChecked = (val: "Profile" | "Billing") =>
    checkboxValues.includes(val);

  const baseGroup = {
    label: "Base",
    type: "base" as const,
    items: [
      {
        label: "Profile",
        id: "Profile",
        icon: <UserIcon className="mr-2 h-4 w-4" />,
        aside: "⇧⌘P",
      },
      {
        label: "Billing",
        id: "Billing",
        icon: <CreditCardIcon className="mr-2 h-4 w-4" />,
        aside: "⌘B",
      },
    ],
  };
  const checkboxGroup = {
    label: "Radio",
    type: "checkbox" as const,
    items: [
      {
        label: "Profile",
        id: "Profile",
        icon: <UserIcon className="mr-2 h-4 w-4" />,
        aside: "⇧⌘P",
        checked: isChecked("Profile"),
        onCheckedChange: () => toggleCheckboxValue("Profile"),
      },
      {
        label: "Billing",
        id: "Billing",
        icon: <CreditCardIcon className="mr-2 h-4 w-4" />,
        aside: "⌘B",
        checked: isChecked("Billing"),
        onCheckedChange: () => toggleCheckboxValue("Billing"),
      },
    ],
  };
  const radioGroup: DropdownRadioGroup<"Profile" | "Billing"> = {
    label: "Checkbox",
    type: "radio",
    value: radioValue,
    onValueChange: setRadioValue,
    items: [
      {
        label: "Profile",
        id: "Profile",
        icon: <UserIcon className="mr-2 h-4 w-4" />,
        aside: "⇧⌘P",
      },
      {
        label: "Billing",
        id: "Billing",
        icon: <CreditCardIcon className="mr-2 h-4 w-4" />,
        aside: "⌘B",
      },
    ],
  };
  return (
    <Card className="h-[800px] p-4">
      <Dropdown
        groups={[baseGroup, checkboxGroup, radioGroup]}
        menuLabel="Dropdown Menu"
        buttonLabel="Open"
      />
    </Card>
  );
}

export function DropdownMenuDemoHideMenuAndGroupLabelTitle() {
  const group2NoLabel = {
    type: "base" as const,
    items: [
      {
        label: "Profile",
        id: "Profile",
        icon: <UserIcon className="mr-2 h-4 w-4" />,
        aside: "⇧⌘P",
      },
      {
        label: "Billing",
        id: "Billing",
        icon: <CreditCardIcon className="mr-2 h-4 w-4" />,
        aside: "⌘B",
      },
    ],
  };

  return (
    <Card className="h-[800px] p-4">
      <Dropdown groups={[group2NoLabel]} buttonLabel="Open" />
    </Card>
  );
}
