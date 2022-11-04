import { cva, VariantProps } from "class-variance-authority";
import { Switch } from "@headlessui/react";

const outerToggleStyles = cva(
  "relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 bg-brand-600",
  {
    variants: {
      active: {
        true: "bg-brand-500",
        false: "bg-brand-100 dark:bg-zinc-600",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);
const innerToggleStyles = cva(
  "pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out bg-brand-500",
  {
    variants: {
      active: {
        true: "translate-x-9 bg-brand-100 dark:bg-zinc-600",
        false: "translate-x-0 ",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

interface Props {
  onClick: () => void;
}

export interface ToggleProps
  extends VariantProps<typeof outerToggleStyles>,
    Props {}

export const Toggle = ({ active, onClick, ...props }: ToggleProps) => {
  console.log(active);
  return (
    <Switch
      checked={!!active}
      className={outerToggleStyles({ active })}
      onClick={onClick}
      {...props}
    >
      <span className="sr-only">Use setting</span>
      <span aria-hidden="true" className={innerToggleStyles({ active })} />
    </Switch>
  );
};
