import { cva, VariantProps } from "class-variance-authority";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const shellStylesOuter = cva(
  "fixed inset-0 mx-auto mx-auto flex w-full max-w-4xl justify-center rounded-lg px-4 px-4 sm:px-6 sm:px-6 md:px-8 md:px-8",
  {
    variants: {
      intent: {
        primary:
          "border-solid border-2 border-zinc-200 bg-white dark:bg-zinc-900",
        secondary:
          "border-solid border-2 border-brand-100 bg-brand-300 dark:bg-zinc-900",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

const shellStylesInner = cva(
  "mx-auto mt-4 mb-16 w-full max-w-4xl px-4 sm:px-6 md:mt-16 md:px-8",
  {
    variants: {
      intent: {
        primary: "border-x-2 border-zinc-200 bg-white dark:bg-zinc-900",
        secondary: "border-x-2 border-brand-100 bg-brand-300 dark:bg-zinc-900",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

const textStyles = cva("", {
  variants: {
    intent: {
      primary: "text-zinc-500 dark:text-zinc-100",
      secondary: "text-zinc-100 dark:text-zinc-100",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

const textCardStyles = cva("", {
  variants: {
    intent: {
      primary: "text-zinc-400 dark:text-zinc-400",
      secondary: "text-zinc-100 dark:text-zinc-100",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

const hrefStyles = cva("", {
  variants: {
    intent: {
      primary: "text-blue-300 dark:text-blue-300",
      secondary: "text-brand-700 dark:text-green-300",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

const subHeaderStyles = cva("mt-6 text-base", {
  variants: {
    intent: {
      primary: "text-zinc-400 dark:text-zinc-400",
      secondary: "text-brand-700 dark:text-green-300",
    },
  },
  defaultVariants: {
    intent: "primary",
  },
});

const hoverStyles = cva(
  "absolute -inset-y-6 -inset-x-4 z-0 scale-95 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl",
  {
    variants: {
      intent: {
        primary: "bg-zinc-200/50 dark:bg-zinc-800/50",
        secondary: "bg-brand-800/50 dark:bg-green-800/50",
      },
    },
    defaultVariants: {
      intent: "primary",
    },
  }
);

export interface ShellProps
  extends VariantProps<typeof shellStylesOuter>,
    VariantProps<typeof shellStylesInner>,
    VariantProps<typeof textStyles>,
    VariantProps<typeof subHeaderStyles> {}

interface Card {
  title: string;
  description: string;
  href: string;
}

interface UISection {
  name: string;
  cards: Array<Card>;
}

interface UICard {
  title: string;
  description: string;
  href: string;
}

export interface UISectionProps
  extends VariantProps<typeof shellStylesOuter>,
    VariantProps<typeof shellStylesInner>,
    VariantProps<typeof textStyles>,
    UISection {}

export interface UIMockupCardProps
  extends VariantProps<typeof shellStylesOuter>,
    VariantProps<typeof shellStylesInner>,
    VariantProps<typeof textStyles>,
    VariantProps<typeof hrefStyles>,
    VariantProps<typeof textCardStyles>,
    VariantProps<typeof hoverStyles>,
    UICard {}

const sampleText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam";

const UISection = ({ ...props }: UISectionProps) => {
  const { name, intent, cards } = props;
  return (
    <section className="mt-16 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
      <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
        <h2
          className={`text-sm font-semibold ${textStyles({
            intent,
          })}`}
        >
          {name}
        </h2>
        <div className="md:col-span-3">
          <ul role="list" className="space-y-16">
            {cards.map((item, index) => {
              return (
                <UIMockupCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  href={item.href}
                  intent={intent}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
const UIMockupCard = ({ ...props }: UIMockupCardProps) => {
  const { title, description, intent, href } = props;
  return (
    <article className="flex flex-row md:items-baseline md:gap-8">
      <div className="max-w-xl" />
      <a className="mt-2 ">
        <div className="group relative flex flex-col items-start md:col-span-3">
          <h2
            className={`text-base font-semibold tracking-tight ${textStyles({
              intent,
            })}`}
          >
            <div className={hoverStyles({ intent })}></div>
            <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
            <span className="relative z-10">{title}</span>
          </h2>
          <div
            className={`relative z-10 mt-2 text-sm ${textCardStyles({
              intent,
            })}`}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {description}
            </ReactMarkdown>
          </div>

          <div
            aria-hidden="true"
            className={`relative z-10 mt-4 flex items-center text-sm font-medium ${hrefStyles(
              { intent }
            )}`}
          >
            Check it out
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="ml-1 h-4 w-4 stroke-current"
            >
              <path
                d="M6.75 5.75 9.25 8l-2.5 2.25"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </div>
      </a>
    </article>
  );
};

export const Shell = ({ intent, ...props }: ShellProps) => {
  return (
    <div>
      <div className={shellStylesOuter({ intent })} />
      <div className="relative">
        <main className={shellStylesInner({ intent })}>
          <div className="mx-auto max-w-2xl lg:max-w-5xl">
            <header className="max-w-2xl">
              <h1
                className={`text-4xl font-bold tracking-tight ${textStyles({
                  intent,
                })} sm:text-5xl`}
              >
                About Me
              </h1>
              <div className={subHeaderStyles({ intent })}>
                {"Some things about me."}
              </div>
            </header>
            <UISection
              name={"Development"}
              intent={intent}
              cards={[
                { title: "test", description: sampleText, href: "/" },
                { title: "test2", description: sampleText, href: "/" },
              ]}
            />
            <UISection
              name={"Career History"}
              intent={intent}
              cards={[
                { title: "test", description: sampleText, href: "/" },
                { title: "test2", description: sampleText, href: "/" },
              ]}
            />
            <UISection
              name={"Hobbies"}
              intent={intent}
              cards={[
                { title: "test", description: sampleText, href: "/" },
                { title: "test2", description: sampleText, href: "/" },
              ]}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
