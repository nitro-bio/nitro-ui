import { Dropdown } from "./Dropdown";

export default {
  title: "UIElements/Dropdown",
  component: Dropdown,
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
    "Wade Cooper",
    "Arlene Mccoy",
    "Devon Webb",
    "Tom Cook",
    "Tanya Fox",
    "Hellen Schmidt",
  ],
  100,
);

export const Default = () => {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl justify-end">
      <Dropdown
        title="people"
        onSelection={(option) => alert(option)}
        menuItems={people}
        menuButtonClassName="bg-noir-600 dark:bg-noir-600"
        menuItemClassName="bg-noir-600 dark:bg-noir-600"
        menuClassName="bg-noir-600 dark:bg-noir-600"
      />
    </div>
  );
};

export const Variety = () => {
  return (
    <div className="mx-auto flex h-80 w-full max-w-3xl flex-col items-end gap-2">
      <Dropdown
        title="people"
        onSelection={(option) => alert(option)}
        menuItems={people}
        menuButtonClassName="bg-red-600 dark:bg-red-600"
        menuItemClassName="bg-red-600 dark:bg-red-600"
        menuClassName="bg-red-600 dark:bg-red-600 h-20"
      />
      <Dropdown
        title="people"
        onSelection={(option) => alert(option)}
        menuItems={people}
        menuButtonClassName="bg-green-600 dark:bg-green-600"
        menuItemClassName="bg-green-600 dark:bg-green-600"
        menuClassName="bg-green-600 dark:bg-green-600 h-40"
      />
      <Dropdown
        title="people"
        onSelection={(option) => alert(option)}
        menuItems={people}
        menuButtonClassName="bg-blue-600 dark:bg-blue-600"
        menuItemClassName="bg-blue-600 dark:bg-blue-600"
        menuClassName="bg-blue-600 dark:bg-blue-600 h-60"
      />
      <Dropdown
        title="people"
        onSelection={(option) => alert(option)}
        menuItems={people}
        menuButtonClassName="bg-amber-600 dark:bg-amber-600"
        menuItemClassName="bg-amber-600 dark:bg-amber-600"
        menuClassName="bg-amber-600 dark:bg-amber-600 h-80"
      />
    </div>
  );
};
