import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { classNames } from "@utils/stringUtils";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={classNames(
      "data-[state=open]:bg-brand-100 data-[state=open]:text-brand-800 dark:data-[state=open]:bg-brand-100 dark:data-[state=open]:text-brand-800",
      "focus:text-brand-800 dark:focus:bg-brand-100",
      "focus:bg-brand-100 focus:text-brand-800",
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={classNames(
      "bg-noir-100 text-noir-800",
      "dark:bg-noir-800 dark:text-noir-100",
      " data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
      className,
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={classNames(
        "bg-noir-100 text-noir-800",
        "dark:bg-noir-800 dark:text-noir-200",
        "animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md",
        className,
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={classNames(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-brand-100 focus:text-brand-800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={classNames(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-brand-100 focus:text-brand-800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={classNames(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-brand-100 focus:text-brand-800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={classNames(
      "px-2 py-1.5 text-sm font-semibold text-noir-500 dark:text-noir-300",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={classNames("bg-border -mx-1 my-1 h-px", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={classNames(
        "ml-auto text-xs tracking-widest text-noir-500 dark:text-noir-300",
        className,
      )}
      {...props}
    />
  );
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};

export interface ContextMenuBaseItem {
  id: string;
  label: string;
  icon?: JSX.Element;
  aside?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface ContextMenuRadioItem {
  id: string;
  label: string;
  icon?: JSX.Element;
  aside?: string;
  disabled?: boolean;
}

export interface ContextMenuCheckboxItem {
  id: string;
  label: string;
  icon?: JSX.Element;
  aside?: string;
  disabled?: boolean;
  checked: boolean;
  onCheckedChange: () => void;
}

export interface ContextMenuBaseGroup {
  label: string;
  items: ContextMenuBaseItem[];
  type: "base";
}

export interface ContextMenuCheckboxGroup {
  label: string;
  items: ContextMenuCheckboxItem[];
  type: "checkbox";
}

export interface ContextMenuRadioGroup {
  label: string;
  items: ContextMenuRadioItem[];
  value: string;
  onValueChange: (value: string) => void;
  type: "radio";
}

export type ContextMenuGroup =
  | ContextMenuBaseGroup
  | ContextMenuCheckboxGroup
  | ContextMenuRadioGroup;

interface NitroContextMenuProps {
  trigger: React.ReactNode;
  groups: ContextMenuGroup[];
  className?: string;
}

export function NitroContextMenu({
  trigger,
  groups,
  className,
}: NitroContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{trigger}</ContextMenuTrigger>
      <ContextMenuContent className={classNames("w-64", className)}>
        {groups.map((group, groupIndex) => (
          <React.Fragment key={`group-${groupIndex}`}>
            {groupIndex > 0 && <ContextMenuSeparator />}
            <ContextMenuLabel>{group.label}</ContextMenuLabel>
            {group.type === "base" && (
              <ContextMenuGroup>
                {(group as ContextMenuBaseGroup).items.map((item) => (
                  <ContextMenuItem
                    key={item.id}
                    disabled={item.disabled}
                    onClick={item.onClick}
                  >
                    {item.icon}
                    {item.label}
                    {item.aside && (
                      <ContextMenuShortcut>{item.aside}</ContextMenuShortcut>
                    )}
                  </ContextMenuItem>
                ))}
              </ContextMenuGroup>
            )}
            {group.type === "checkbox" && (
              <ContextMenuGroup>
                {(group as ContextMenuCheckboxGroup).items.map((item) => (
                  <ContextMenuCheckboxItem
                    key={item.id}
                    checked={item.checked}
                    disabled={item.disabled}
                    onCheckedChange={item.onCheckedChange}
                  >
                    {item.icon}
                    {item.label}
                    {item.aside && (
                      <ContextMenuShortcut>{item.aside}</ContextMenuShortcut>
                    )}
                  </ContextMenuCheckboxItem>
                ))}
              </ContextMenuGroup>
            )}
            {group.type === "radio" && (
              <ContextMenuRadioGroup
                value={(group as ContextMenuRadioGroup).value}
                onValueChange={(group as ContextMenuRadioGroup).onValueChange}
              >
                {(group as ContextMenuRadioGroup).items.map((item) => (
                  <ContextMenuRadioItem
                    key={item.id}
                    disabled={item.disabled}
                    value={item.id}
                  >
                    {item.icon}
                    {item.label}
                    {item.aside && (
                      <ContextMenuShortcut>{item.aside}</ContextMenuShortcut>
                    )}
                  </ContextMenuRadioItem>
                ))}
              </ContextMenuRadioGroup>
            )}
          </React.Fragment>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}
