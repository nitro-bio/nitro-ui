import { cva, VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  "inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium",
  {
    variants: {
      intent: {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700",
        secondary: "text-indigo-00 bg-zinc-400 hover:bg-gray-300",
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
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={buttonStyles({ intent, fullWidth })}
      {...props}
    >
      {children}
    </button>
  );
};
