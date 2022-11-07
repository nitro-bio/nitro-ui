import { cva, VariantProps } from "class-variance-authority";
import { Switch } from "@headlessui/react";

const outerToggleStyles = cva(
  "relative inline-flex h-9 w-20 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75",
  {
    variants: {
      checked: {
        true: "bg-brand-400",
        false: "bg-zinc-400",
      },
    },
    defaultVariants: {
      checked: true,
    },
  }
);

const innerToggleStyles = cva(
  "pointer-events-none inline-block h-8 w-8 transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out",
  {
    variants: {
      checked: {
        true: "translate-x-11 bg-brand-300",
        false: "translate-x-0 bg-zinc-600",
      },
    },
    defaultVariants: {
      checked: true,
    },
  }
);

export interface Props {
  onClick: () => void;
}

export interface ToggleProps
  extends VariantProps<typeof outerToggleStyles>,
    VariantProps<typeof innerToggleStyles>,
    Props {}

export const Toggle = ({ checked, ...props }: ToggleProps) => (
  <Switch
    checked={!!checked}
    className={outerToggleStyles({ checked })}
    {...props}
  >
    <span className="sr-only">Use setting</span>
    <span aria-hidden="true" className={innerToggleStyles({ checked })} />
  </Switch>
);
