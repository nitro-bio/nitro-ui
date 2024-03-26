import { useEffect, useState } from "react";
import { Combobox, ComboboxSection } from "./Combobox";
import { v4 as uuid4 } from "uuid";
import { Card } from "@ui/Card";

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
    {
      options: [
        { id: uuid4(), label: "Wade Cooper" },
        { id: uuid4(), label: "Arlene Mccoy" },
        { id: uuid4(), label: "Devon Webb" },
        { id: uuid4(), label: "Tom Cook" },
        { id: uuid4(), label: "Tanya Fox" },
        { id: uuid4(), label: "Hellen Schmidt" },
      ],
    },
  ],
  100,
).map((p, i) => ({ ...p, id: `Section ${i}`, label: `Section ${i}` }));

export const Default = () => {
  const [search, setSearch] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch("Wade");
    }, 1000);
    return () => clearTimeout(timeout);
  }, [search]);
  return (
    <Card className="h-80 max-w-3xl">
      <Combobox
        sections={people}
        search={search}
        setSearch={setSearch}
        onSelect={(option) => alert(option.label)}
        placeholder="Search"
        listClassName="w-80"
      />
    </Card>
  );
};

export const Loading = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [_people, setPeople] = useState<ComboboxSection[]>([]);
  useEffect(function simulateLoading() {
    const timeout = setTimeout(() => {
      setLoading(false);
      setPeople(people);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Card className="h-80 max-w-xl">
      <Combobox
        sections={_people}
        loading={loading}
        search={search}
        setSearch={setSearch}
        loadingText="Searching Census..."
        onSelect={(option) => alert(option.label)}
        placeholder="Search"
        listClassName="w-80"
      />
    </Card>
  );
};
