declare module "react-selectable" {
  export interface SelectableGroupProps {
    onBeginSelection?: (event: React.MouseEvent | React.TouchEvent) => void;
    onSelection?: (
      items: string[],
      event: React.MouseEvent | React.TouchEvent,
    ) => void;
    onEndSelection?: (
      items: string[],
      event: React.MouseEvent | React.TouchEvent,
    ) => void;
    onNonItemClick?: (event: React.MouseEvent | React.TouchEvent) => void;
    tolerance?: number;
    component?: string;
    fixedPosition?: boolean;
    preventDefault?: boolean;
    enabled?: boolean;
    className?: string;
    selectingClassName?: string;
    children: React.ReactNode;
  }

  export const SelectableGroup: React.ComponentType<SelectableGroupProps>;
  export const createSelectable: <T>(
    component: React.ComponentType<T>,
  ) => React.ComponentType<T>;
}
