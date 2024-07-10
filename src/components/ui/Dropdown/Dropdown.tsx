import {
  CheckCircleIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@heroicons/react/20/solid";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Button } from "@ui/Button/Button";
import { classNames } from "@utils/stringUtils";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
  ReactNode,
  forwardRef,
} from "react";

export interface DropdownBaseItem {
  id: string;
  label: string;
  icon?: JSX.Element;
  aside?: string;
  disabled?: boolean;
  onClick?: () => void;
}
export interface DropdownRadioItem {
  id: string;
  label: string;
  icon?: JSX.Element;
  aside?: string;
  disabled?: boolean;
}
export interface DropdownCheckboxItem {
  id: string;
  label: string;
  icon?: JSX.Element;
  aside?: string;
  disabled?: boolean;
  checked: boolean;
  onCheckedChange: () => void;
}

export interface DropdownBaseGroup {
  label: string;
  items: DropdownBaseItem[];
  type: "base";
}
export interface DropdownCheckboxGroup {
  label: string;
  items: DropdownCheckboxItem[];
  type: "checkbox";
}
export interface DropdownRadioGroup<T extends string> {
  label: string;
  items: DropdownRadioItem[];
  value: T;
  onValueChange: (value: T) => void;
  type: "radio";
}
export type DropdownGroup<T extends string> =
  | DropdownBaseGroup
  | DropdownCheckboxGroup
  | DropdownRadioGroup<T>;

function Dropdown<T extends string>({
  buttonLabel,
  menuLabel,
  groups,
}: {
  buttonLabel: ReactNode;
  menuLabel: string;
  groups: DropdownGroup<T>[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{buttonLabel}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {groups.map((group, i) => {
          if (group.type === "checkbox") {
            return (
              <DropdownMenuGroup key={`${group.label}-checkbox-${i}`}>
                <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
                {group.items.map((item) => (
                  <DropdownMenuCheckboxItem
                    key={item.id}
                    checked={item.checked}
                    onCheckedChange={() => item.onCheckedChange()}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.aside && (
                      <DropdownMenuShortcut>{item.aside}</DropdownMenuShortcut>
                    )}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuGroup>
            );
          }
          if (group.type === "radio") {
            return (
              <DropdownMenuRadioGroup
                key={`${group.label}-${i}`}
                value={group.value}
                onValueChange={(value) => group.onValueChange(value as T)}
              >
                <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
                {group.items.map((item) => (
                  <DropdownMenuRadioItem key={item.id} value={item.id}>
                    {item.icon}
                    <span>{item.label}</span>
                    {item.aside && (
                      <DropdownMenuShortcut>{item.aside}</DropdownMenuShortcut>
                    )}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            );
          }
          if (group.type === "base") {
            return (
              <DropdownMenuGroup key={`${group.label}-${i}`}>
                <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
                {group.items.map((item) => (
                  <DropdownMenuItem onClick={item.onClick} key={item.id}>
                    {item.icon}
                    <span>{item.label}</span>
                    {item.aside && (
                      <DropdownMenuShortcut>{item.aside}</DropdownMenuShortcut>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            );
          } else {
            const _group = group as { type: string };
            throw new Error(`Invalid group type: ${_group.type}`);
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
Dropdown.displayName = "Dropdown";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={classNames(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none ",
      "focus:bg-brand-300 data-[state=open]:bg-brand-300 ",
      "dark:focus:bg-brand-800 dark:data-[state=open]:bg-brand-800 ",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={classNames(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg",
      "bg-noir-100 text-noir-800",
      "dark:bg-noir-800 dark:text-noir-100",

      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={classNames(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
        "dark:border-noir-600 dark:bg-noir-800 dark:text-noir-100",
        "border-noir-600 bg-noir-100 text-noir-800",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Item>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={classNames(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "hover:bg-brand-100 hover:text-brand-800 focus:bg-brand-100 focus:text-brand-800",
      "dark:focus:bg-brand-800 dark:focus:text-brand-100",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={classNames(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "bg-noir-100 text-noir-800 focus:bg-brand-100 focus:text-brand-800",
      "dark:bg-noir-800 dark:text-noir-100 dark:focus:bg-brand-800 dark:focus:text-brand-100",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={classNames(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "dark:focus:bg-brand-800 dark:focus:text-brand-100",
      "focus:bg-brand-100 focus:text-brand-800",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckCircleIcon
          className={classNames(
            "h-3 w-3",
            "dark:fill-brand-600",
            "fill-brand-500 ",
          )}
        />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Label>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={classNames(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={classNames(
      "-mx-1 my-1 h-px",
      "bg-noir-600",
      "dark:bg-noir-300",
      className,
    )}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={classNames(
        "ml-auto text-xs tracking-widest opacity-60",
        className,
      )}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  Dropdown,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
