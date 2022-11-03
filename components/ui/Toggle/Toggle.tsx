import { cva, VariantProps } from "class-variance-authority";
import { Switch } from "@headlessui/react";

const toggleStyles = cva(
  "relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75",
  {
    variants: {
      intent: {
        lightEnabled: "bg-blue-500",
        lightDisabled: "bg-blue-200",
        darkEnabled: "bg-slate-500",
        darkDisabled: "bg-slate-200",
      },
    },
    defaultVariants: {
      intent: "lightEnabled",
    },
  }
);
export interface ToggleProps extends VariantProps<typeof toggleStyles> {}

export const Toggle = ({ intent, ...props }: ToggleProps) => {
  return (
    <Switch
      checked={intent && intent.includes("Enabled") ? true : false}
      className={toggleStyles({ intent })}
      {...props}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${
          intent && intent.includes("Enabled")
            ? "translate-x-9"
            : "translate-x-0"
        }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full ${
              intent && intent.includes("dark") ? "bg-orange-300" : "bg-white"
            } shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
};
