import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

interface Props {
  sections: Array<UISection>;
  title: string;
  subtitle: string;
}

const UISection = ({ ...props }: UISection) => {
  const { name, cards } = props;
  return (
    <section className="mt-16 md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
      <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-8 md:grid-cols-4">
        <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-100">
          {name}
        </h2>
        <div className="md:col-span-3">
          <ul role="list" className="space-y-16">
            {cards.map((item) => {
              return (
                <UIMockupCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  href={item.href}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
const UIMockupCard = ({ ...props }: UICard) => {
  const { title, description, href } = props;
  return (
    <article className="flex flex-row md:items-baseline md:gap-8">
      <div className="max-w-xl" />
      <a href={href} className="mt-2">
        <div className="group relative flex flex-col items-start md:col-span-3">
          <h2 className="text-base font-semibold tracking-tight text-zinc-500 dark:text-zinc-100">
            <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl bg-zinc-200/50 dark:bg-zinc-800/50"></div>
            <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
            <span className="relative z-10">{title}</span>
          </h2>
          <div className="relative z-10 mt-2 text-sm text-zinc-400 dark:text-zinc-400">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {description}
            </ReactMarkdown>
          </div>

          <div
            aria-hidden="true"
            className="relative z-10 mt-4 flex items-center text-sm font-medium text-brand-300 dark:text-brand-300"
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

export const Shell = ({ sections, title, subtitle }: Props) => {
  return (
    <div>
      <div className="fixed inset-0 mx-auto mx-auto flex w-full h-full max-w-4xl border-solid border-2 border-zinc-200 bg-white dark:bg-zinc-900 justify-center rounded-lg px-4 px-4 sm:px-6 sm:px-6 md:px-8 md:px-8" />
      <div className="relative">
        <main className="mx-auto mt-4 mb-16 w-full border-x-2 border-zinc-200 bg-white dark:bg-zinc-900 max-w-4xl px-4 sm:px-6 md:mt-16 md:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-5xl">
            <header className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-zinc-500 dark:text-zinc-100">
                {title}
              </h1>
              <div className="mt-6 text-base text-zinc-400 dark:text-zinc-400">
                {subtitle}
              </div>
            </header>
            {sections.map((item) => {
              return (
                <UISection
                  key={item.name}
                  name={item.name}
                  cards={item.cards}
                />
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};
