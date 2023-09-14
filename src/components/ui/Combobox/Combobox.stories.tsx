import { Combobox } from "./Combobox";

export default {
  title: "UIElements/Combobox",
  component: Combobox,
};

function repeatArray<T>(arr: T[], n: number): T[] {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(...arr);
  }
  return result;
}

const people = repeatArray(
  [
    { label: "Wade Cooper" },
    { label: "Arlene Mccoy" },
    { label: "Devon Webb" },
    { label: "Tom Cook" },
    { label: "Tanya Fox" },
    { label: "Hellen Schmidt" },
  ],
  100
).map((p, i) => ({ ...p, id: i.toString() }));

export const Default = () => {
  return (
    <div className="fixed top-16 w-72">
      <Combobox
        options={people}
        onSelect={(option) => alert(option.label)}
        selectedOptionIdx={0}
      />
    </div>
  );
};

export const ContainerClassname = () => {
  return (
    <div className="fixed top-16 w-72">
      <Combobox
        options={people}
        onSelect={(option) => alert(option.label)}
        selectedOptionIdx={0}
        optionsContainerClassName="mt-32 ml-32 !min-w-[600px]"
      />
    </div>
  );
};
