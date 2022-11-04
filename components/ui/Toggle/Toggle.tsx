import { cva, VariantProps } from "class-variance-authority";
import { Switch } from "@headlessui/react";

const outerToggleStyles = cva(
  "relative inline-flex h-[2.375rem] w-[4.625rem] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75",
  {
    variants: {
      enabled: {
        true: "bg-brand-400 dark:bg-brand-600",
        false: "bg-zinc-400 dark:bg-zinc-600",
      },
    },
    defaultVariants: {
      enabled: true,
    },
  }
);

const innerToggleStyles = cva(
  "rpointer-events-none inline-block h-[2.125rem] w-[2.125rem] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out",
  {
    variants: {
      enabled: {
        true: "translate-x-9 bg-brand-200 dark:bg-brand-400",
        false: "translate-x-0 bg-zinc-200 dark:bg-zinc-400",
      },
    },
    defaultVariants: {
      enabled: true,
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

export const Toggle = ({ enabled, ...props }: ToggleProps) => {
  return (
    <Switch
      checked={enabled}
      className={outerToggleStyles({ enabled })}
      {...props}
    >
      <span className="sr-only">Use setting</span>
      <span aria-hidden="true" className={innerToggleStyles({ enabled })} />
    </Switch>
  );
};
