import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { classNames } from "@utils/stringUtils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: classNames(
          "bg-brand-300 text-brand-800 hover:bg-brand-300/90",
          "dark:bg-brand-800 dark:text-brand-300 dark:hover:bg-brand-800/90",
        ),
        destructive: classNames(
          "bg-red-400 text-red-800 hover:bg-red-400/90",
          "dark:bg-red-700 dark:text-red-100 dark:hover:bg-red-700/90",
        ),
        outline: classNames(
          "border",
          "hover:bg-noir-100 hover:text-noir-800",
          "dark:hover:bg-noir-700 dark:hover:text-noir-100 dark:border-noir-100",
          "border-noir-800 ",
        ),
        accent: classNames(
          "bg-accent-300 text-accent-800 hover:bg-accent-300/80",
          "dark:bg-accent-800 dark:text-accent-300 dark:hover:bg-accent-800/80",
        ),
        ghost: classNames(
          "hover:bg-brand-300 hover:text-brand-800",
          "dark:hover:bg-brand-800 dark:hover:text-brand-300",
        ),
        link: classNames(
          "underline-offset-4 hover:underline",
          "dark:text-brand-300",
          "text-brand-600",
        ),
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={classNames(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
