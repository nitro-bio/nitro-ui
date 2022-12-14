import { cva, VariantProps } from "class-variance-authority";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const menuDropdownButtonStyles = cva(
  "focus-visible:ring-white inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75",
  {
    variants: {
      intent: {
        primary: "bg-brand-600 dark:bg-brand-400",
        secondary: "bg-noir-500 dark:bg-noir-600",
      },
    },
    defaultVariants: { intent: "primary" },
  }
);

const menuItemsContainerStyles = cva(
  "ring-black absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-opacity-5 focus:outline-none ",
  {
    variants: {
      intent: {
        primary: "bg-brand-600 dark:bg-brand-400 text-white",
        secondary: "bg-noir-500 dark:bg-noir-600 dark:text-white text-white",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

const menuItemStyles = cva(
  "group flex w-full items-center rounded-md px-2 py-2 text-sm dark:text-white",
  {
    variants: {
      intent: {
        primary: "bg-brand-600 dark:bg-brand-400 text-white",
        secondary: "bg-noir-500 dark:bg-noir-600 dark:text-white",
      },
      active: {
        true: "opacity-50 bg-opacity-50 bg-inherit",
        false: "opacity-100 bg-opacity-100",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

interface Props {
  name: string;
}
export interface MenuItemProps
  extends VariantProps<typeof menuItemStyles>,
    Props {}

export const MenuItem = ({ ...props }: MenuItemProps) => (
  <Menu.Item>
    {({ active }) => (
      <button className={menuItemStyles({ active })}>
        <div className="mr-2 h-5 w-5" aria-hidden="true" />

        {props.name}
      </button>
    )}
  </Menu.Item>
);

const MenuItems = ["option 1", "option 2", "option 3"];

export type MenuContainerProps = VariantProps<typeof menuItemsContainerStyles>;

export const Dropdown = ({ intent }: MenuContainerProps) => (
  <Menu as="div" className="relative inline-block text-left text-right">
    <div>
      <Menu.Button className={menuDropdownButtonStyles({ intent })}>
        Click Me
        <ChevronDownIcon
          className="ml-2 -mr-1 h-5 w-5 text-brand-200 hover:text-brand-100"
          aria-hidden="true"
        />
      </Menu.Button>
    </div>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className={menuItemsContainerStyles({ intent })}>
        <div className="px-1 py-1 ">
          {MenuItems.map((name, index) => (
            <MenuItem key={index} name={name} />
          ))}
        </div>
      </Menu.Items>
    </Transition>
  </Menu>
);
