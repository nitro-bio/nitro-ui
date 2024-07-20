import { Input } from "@ui/Input/Input";
import { classNames } from "@utils/stringUtils";
import { Command } from "cmdk";
import { useState } from "react";

interface Props {
  search: string;
  setSearch: (search: string) => void;
  sections: ComboboxSection[];
  onSelect: (option: ComboboxOption) => void;
  loading?: boolean;
  loadingText?: string;
  placeholder?: string;
  emptyMessage?: React.ReactNode;
  inputClassName?: string;
  itemClassName?: string;
  groupClassName?: string;
  listClassName?: string;
  commandClassName?: string;
}

export interface ComboboxOption {
  id: string;
  label: string;
}
export interface ComboboxSection {
  id: string;
  label: string;
  options: ComboboxOption[];
}

export function Combobox({
  search,
  setSearch,
  loading,
  loadingText,
  sections,
  onSelect,
  placeholder,
  emptyMessage,
  inputClassName,
  itemClassName,
  groupClassName,
  listClassName,
  commandClassName,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Command
      label="Command Menu"
      className={classNames(
        "block text-sm font-medium leading-6 text-noir-900",
        commandClassName,
      )}
    >
      <Command.Input
        asChild
        onValueChange={setSearch}
        onFocus={() => setOpen(true)}
      >
        <Input
          placeholder={placeholder}
          value={search}
          className={classNames(
            "w-full rounded-md border py-1.5 pl-3 pr-12 shadow-sm sm:text-sm sm:leading-6",
            "dark:border-noir-100 dark:bg-noir-800 dark:text-noir-100",
            "border-noir-800 bg-white text-noir-900",
            inputClassName,
          )}
        />
      </Command.Input>
      {loading && (
        <Command.Loading
          className={classNames("text-brand-800 dark:text-brand-200")}
        >
          {loadingText ? loadingText : "Loading.."}
        </Command.Loading>
      )}
      <Command.List
        className={classNames(
          "max-h-60 w-full overflow-auto rounded-md py-1 text-base  shadow-lg focus:outline-none sm:text-sm",
          "bg-white text-noir-900",
          "dark:bg-noir-800 dark:text-noir-100",
          listClassName,
          open ? "visible" : "invisible",
        )}
      >
        <Command.Empty className={classNames(itemClassName, "py-2 pl-3 pr-9")}>
          {emptyMessage ? <>{emptyMessage}</> : "No results found"}
        </Command.Empty>

        {sections.map((section) => {
          return (
            <Command.Group
              key={section.id}
              heading={
                <div className="py-2">
                  <label
                    className={classNames(
                      "ml-3 border-b border-brand-400 py-2 pr-8 text-brand-600 dark:border-brand-400 dark:text-brand-400",
                      groupClassName,
                    )}
                  >
                    {section.label}
                  </label>
                </div>
              }
            >
              {section.options.map((option) => {
                return (
                  <Command.Item
                    key={option.id}
                    onSelect={() => {
                      onSelect(option);
                      setSearch(option.label);
                      // get a weird setState error if we don't do wait to close
                      setTimeout(() => setOpen(false), 100);
                    }}
                    className={classNames(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      "hover:bg-noir-100 dark:hover:bg-noir-700",
                      "text-noir-900 dark:text-noir-100",
                      itemClassName,
                    )}
                  >
                    {option.label}
                  </Command.Item>
                );
              })}
            </Command.Group>
          );
        })}
      </Command.List>
    </Command>
  );
}
