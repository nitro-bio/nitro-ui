import { cva, VariantProps } from "class-variance-authority";
import { Fragment, useEffect, useState } from "react";
import { Combobox as HeadlessCombobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "@utils/stringUtils";
import RenderIfVisible from "react-render-if-visible";

interface Props {
  options: ComboboxOption[];
  onSelect: (option: ComboboxOption) => void;
  selectedOptionIdx: number;
}

const comboboxStyles = cva();
export interface ComboboxProps
  extends VariantProps<typeof comboboxStyles>,
    Props {}

interface ComboboxOption {
  id: string;
  label: string;
}

export function Combobox({
  options,
  selectedOptionIdx,
  onSelect,
}: ComboboxProps) {
  const [selected, setSelected] = useState(options[0]);
  useEffect(
    function syncSelectedOption() {
      if (selectedOptionIdx >= 0) {
        const selectedOption = options[selectedOptionIdx];

        setSelected(selectedOption);
      }
    },
    [selectedOptionIdx, options]
  );

  const [query, setQuery] = useState("");

  const filteredOptions: ComboboxOption[] =
    query === ""
      ? options
      : options.filter((opt) =>
          opt.label
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <HeadlessCombobox
      value={selected}
      onChange={(e) => {
        setSelected(e);
        onSelect(e);
      }}
    >
      <div className="relative mt-1">
        <div className="focus-visible:ring-brand-300 relative w-full cursor-default overflow-hidden rounded-lg text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 dark:border dark:border-brand-300 sm:text-sm">
          <HeadlessCombobox.Input
            className="w-full border-none bg-white py-2 pl-3 pr-10 text-sm leading-5 text-noir-900 focus:ring-0 dark:bg-noir-800 dark:text-brand-100"
            displayValue={(opt: ComboboxOption) => opt.label}
            onChange={(event) => setQuery(event.target.value)}
          />
          <HeadlessCombobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-noir-400"
              aria-hidden="true"
            />
          </HeadlessCombobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <HeadlessCombobox.Options className="ring-brand-300 absolute z-10 mt-1 max-h-60 w-full  overflow-auto rounded-md bg-white bg-white py-1 text-base shadow-2xl ring-1 ring-opacity-5 focus:outline-none dark:bg-noir-800 dark:text-noir-100 sm:text-sm">
            {filteredOptions.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-noir-700">
                Nothing found.
              </div>
            ) : (
              filteredOptions.map((opt) => (
                <RenderIfVisible key={opt.id} defaultHeight={36}>
                  <HeadlessCombobox.Option
                    className={({ active }) =>
                      classNames(
                        "relative cursor-default select-none py-2 pl-10 pr-4",
                        active
                          ? "bg-brand-600 text-white dark:text-noir-100"
                          : "text-noir-900 dark:text-noir-100"
                      )
                    }
                    value={opt}
                    onSelect={() => setSelected(opt)}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            "block truncate",
                            selected ? "font-medium" : "font-normal"
                          )}
                        >
                          {opt.label}
                        </span>
                        {selected ? (
                          <span
                            className={classNames(
                              "absolute inset-y-0 left-0 flex items-center pl-3",
                              active
                                ? "text-white dark:text-noir-800"
                                : "text-brand-600"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </HeadlessCombobox.Option>
                </RenderIfVisible>
              ))
            )}
          </HeadlessCombobox.Options>
        </Transition>
      </div>
    </HeadlessCombobox>
  );
}
