import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../..";
import RenderIfVisible from "react-render-if-visible";

export const MenuItem = ({
  name,
  className,
  onClick,
}: {
  name: string;
  className?: string;
  onClick: () => void;
}) => (
  <RenderIfVisible defaultHeight={36}>
    <Menu.Item>
      {({ active }) => (
        <button
          className={classNames(
            "group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-white",
            active
              ? "bg-inherit bg-opacity-50 opacity-50"
              : "bg-opacity-100 opacity-100",
            className
          )}
          onClick={onClick}
        >
          <div className="mr-2 h-5 w-5" aria-hidden="true" />
          {name}
        </button>
      )}
    </Menu.Item>
  </RenderIfVisible>
);

export const Dropdown = ({
  title,
  menuClassName,
  menuButtonClassName,
  menuItemClassName,
  menuItems,
  onSelection,
  initialSelectedIdx,
}: {
  title: string;
  menuClassName?: string;
  menuItemClassName?: string;
  menuButtonClassName?: string;
  menuItems: string[];
  onSelection: (selection: string) => void;
  initialSelectedIdx?: number;
}) => {
  if (
    initialSelectedIdx != undefined &&
    initialSelectedIdx >= menuItems.length
  ) {
    throw new Error(
      `initialSelectedIdx must be less than the length of menuItems`
    );
  }

  const [selectedItem, setSelectedItem] = useState<string | null>(
    initialSelectedIdx != undefined ? menuItems[initialSelectedIdx] : null
  );

  return (
    <Menu as="div" className={classNames("relative inline-block text-right")}>
      <Menu.Button
        className={classNames(
          "focus-visible:ring-white inline-flex w-full justify-center truncate rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75",
          menuButtonClassName
        )}
      >
        {title}
        {selectedItem && (
          <>
            {" | "}
            {selectedItem}
          </>
        )}
        <ChevronDownIcon
          className="-mr-1 ml-2 h-5 w-5 text-brand-200 hover:text-brand-100"
          aria-hidden="true"
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={classNames(
            "ring-black absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 overflow-y-auto  rounded-md p-1 text-white shadow-lg ring-1 ring-opacity-5 focus:outline-none",
            menuClassName
          )}
        >
          {menuItems.map((name, index) => (
            <MenuItem
              key={index}
              name={name}
              onClick={() => {
                onSelection(name);
                setSelectedItem(name);
              }}
              className={menuItemClassName}
            />
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
