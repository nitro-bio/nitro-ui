import { cva, VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  "inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium",
  {
    variants: {
      intent: {
        primary: "bg-brand-600 text-white hover:bg-brand-700",
        secondary: "text-brand-00 bg-noir-400 hover:bg-gray-300",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);
export interface ButtonProps
  extends VariantProps<typeof buttonStyles>,
    React.HTMLAttributes<HTMLButtonElement> {}

export const Button = ({
  intent,
  fullWidth,
  children,
  ...props
}: ButtonProps) => (
  <button
    type="button"
    className={buttonStyles({ intent, fullWidth })}
    {...props}
  >
    {children}
  </button>
);
