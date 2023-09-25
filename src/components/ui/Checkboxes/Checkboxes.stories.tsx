import { useState } from "react";
import { Checkboxes } from ".";

export default {
  title: "UIElements/Checkboxes",
  component: Checkboxes,
  argTypes: {
    fullWidth: { type: "boolean" },
  },
};

export const OnChange = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const labels = ["Protein A", "Protein B", "Protein C", "Protein D"];
  const onChange = (data: Record<string, boolean>) => {
    setChecked(data);
  };
  return (
    <>
      <div className="mb-4">
        <p>Checked: {JSON.stringify(checked)}</p>
      </div>
      <Checkboxes labels={labels} onChange={onChange} formClassName="w-96" />
    </>
  );
};

export const OnSubmit = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const labels = ["Protein A", "Protein B", "Protein C", "Protein D"];
  const onSubmit = (data: Record<string, boolean>) => {
    setChecked(data);
  };
  return (
    <>
      <div className="mb-4">
        <p>Checked: {JSON.stringify(checked)}</p>
      </div>
      <Checkboxes labels={labels} onSubmit={onSubmit} formClassName="w-96" />
    </>
  );
};

export const OnSubmitStyled = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const labels = ["Protein A", "Protein B", "Protein C", "Protein D"];
  const onSubmit = (data: Record<string, boolean>) => {
    setChecked(data);
  };
  return (
    <>
      <div className="mb-4">
        <p>Checked: {JSON.stringify(checked)}</p>
      </div>
      <Checkboxes
        labels={labels}
        onSubmit={onSubmit}
        formClassName="w-96"
        submitButtonClassName="btn btn-primary"
      />
    </>
  );
};
