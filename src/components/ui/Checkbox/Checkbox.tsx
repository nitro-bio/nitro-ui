import { CheckIcon } from "lucide-react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { classNames } from "@utils/stringUtils";
import * as React from "react";

type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> & {
  className?: string;
};

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={classNames(
      "ring-offset-background focus-visible:ring-ring peer h-4 w-4 shrink-0 rounded-sm border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      "border-brand-600 data-[state=checked]:bg-brand-600 data-[state=checked]:text-brand-100 ",
      "dark:border-brand-600 dark:data-[state=checked]:bg-brand-200 dark:data-[state=checked]:text-brand-600 ",

      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={classNames("flex items-center justify-center text-current")}
    >
      <CheckIcon className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
