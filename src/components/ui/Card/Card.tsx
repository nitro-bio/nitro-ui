import { cva, VariantProps } from "class-variance-authority";

const cardStyles = cva(
  "container mx-auto sm:px-6 lg:px-8 sm:py-2 lg:py-4 md:rounded-xl shadow-lg hover:shadow-xl dark:bg-noir-800 bg-noir-50 dark:text-noir-50 text-noir-900 transition duration-300 ease-in-out",
);
export interface CardProps
  extends VariantProps<typeof cardStyles>,
    React.HTMLAttributes<HTMLDivElement> {}

export const Card = ({ className, children, ...props }: CardProps) => (
  <section className={cardStyles({ class: className })} {...props}>
    {children}
  </section>
);
