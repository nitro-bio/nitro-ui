import { Fragment } from "react/jsx-runtime";
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "./ContextMenu";

export interface NitroContextMenuBaseItem {
  id: string;
  label: string;
  icon?: JSX.Element;
  aside?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface NitroContextMenuRadioItem {
  id: string;
  label: string;
  icon?: JSX.Element;
  aside?: string;
  disabled?: boolean;
}

export interface NitroContextMenuCheckboxItem {
  id: string;
  label: string;
  icon?: JSX.Element;
  aside?: string;
  disabled?: boolean;
  checked: boolean;
  onCheckedChange: () => void;
}

export interface NitroContextMenuBaseGroup {
  label: string;
  items: NitroContextMenuBaseItem[];
  type: "base";
}

export interface NitroContextMenuCheckboxGroup {
  label: string;
  items: NitroContextMenuCheckboxItem[];
  type: "checkbox";
}

export interface NitroContextMenuRadioGroup {
  label: string;
  items: NitroContextMenuRadioItem[];
  value: string;
  onValueChange: (value: string) => void;
  type: "radio";
}

export type NitroContextMenuGroup =
  | NitroContextMenuBaseGroup
  | NitroContextMenuCheckboxGroup
  | NitroContextMenuRadioGroup;

interface NitroContextMenuProps {
  trigger: React.ReactNode;
  groups: NitroContextMenuGroup[];
  asChild?: boolean;
}

export function NitroContextMenu({
  trigger,
  groups,
  asChild,
}: NitroContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild={asChild}>{trigger}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        {groups.map((group: NitroContextMenuGroup, groupIndex: number) => (
          <Fragment key={`group-${groupIndex}`}>
            {groupIndex > 0 && <ContextMenuSeparator />}
            <ContextMenuLabel>{group.label}</ContextMenuLabel>
            {group.type === "base" && (
              <ContextMenuGroup>
                {(group as NitroContextMenuBaseGroup).items.map((item) => (
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
                {(group as NitroContextMenuCheckboxGroup).items.map((item) => (
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
                value={(group as NitroContextMenuRadioGroup).value}
                onValueChange={
                  (group as NitroContextMenuRadioGroup).onValueChange
                }
              >
                {(group as NitroContextMenuRadioGroup).items.map((item) => (
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
          </Fragment>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
}
