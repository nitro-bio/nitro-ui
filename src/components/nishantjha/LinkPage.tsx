import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface LinkCardProps {
  title: string;
  description: string;
  href: string;
}
interface LinkPageProps {
  entries: Array<LinkCardProps>;
  title: string;
  subtitle: string;
}

const ListCard = ({ title, description, href }: LinkCardProps) => {
  return (
    <article className="flex flex-row md:items-baseline md:gap-8">
      <div className="max-w-xl" />
      <a href={href} className="mt-2">
        <div className="group relative flex flex-col items-start md:col-span-3">
          <h2 className="text-base font-semibold tracking-tight text-noir-800 dark:text-noir-100">
            <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-noir-200/50 bg-white/50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-noir-800 sm:-inset-x-6 sm:rounded-2xl"></div>
            <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
            <span className="relative z-10">{title}</span>
          </h2>
          <div className="relative z-10 mt-2 text-sm text-noir-400 dark:text-noir-400">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {description}
            </ReactMarkdown>
          </div>

          <div
            aria-hidden="true"
            className="relative z-10 mt-4 flex items-center text-sm font-medium text-brand-600 dark:text-brand-300"
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

export const LinkPage = ({ entries, title, subtitle }: LinkPageProps) => {
  return (
    <>
      <div className="fixed inset-0 mx-auto mx-auto flex h-full w-full max-w-4xl justify-center rounded-lg border-2 border-solid border-noir-200 bg-white px-4 px-4 dark:bg-noir-900 sm:px-6 sm:px-6 md:px-8 md:px-8" />
      <div className="relative">
        <main className="mx-auto mt-4 mb-16 w-full max-w-4xl border-x-2 border-noir-200 bg-white px-4 dark:bg-noir-900 sm:px-6 md:mt-16 md:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-5xl">
            <header className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-noir-800 dark:text-noir-100 sm:text-5xl">
                {title}
              </h1>
              <div className="mt-6 text-base text-noir-600 dark:text-noir-400">
                {subtitle}
              </div>
            </header>
            <div className="mt-16 md:border-l md:border-noir-100 md:pl-6 md:dark:border-brand-300">
              {entries.map((item) => {
                return (
                  <div className="mt-10" key={item.title}>
                    <ListCard
                      key={item.title}
                      title={item.title}
                      description={item.description}
                      href={item.href}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
