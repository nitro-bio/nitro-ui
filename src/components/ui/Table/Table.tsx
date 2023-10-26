import { usePaginator } from "@hooks/usePaginator";
import { Paginator } from "@ui/Paginator";
import { classNames } from "@utils/stringUtils";
import { z } from "zod";

export const Table = <T extends object>({
  data,
  resultsPerPage,
  className,
  compact,
}: {
  data: T[];
  resultsPerPage: number;
  compact?: boolean;
  className?: string;
}) => {
  const paddingClass = compact ? "" : "px-2 py-1";
  const { currentPage, totalPages, nextPage, prevPage, currentDataSlice } =
    usePaginator<T>({
      data,
      resultsPerPage,
    });

  if (data.length === 0) {
    return (
      <div
        className={classNames(
          "mt-8 flex items-center justify-center rounded-xl border border-brand-800 bg-noir-50 text-sm font-medium text-noir-900",
          paddingClass,
          className
        )}
      >
        No results found.
      </div>
    );
  }

  return (
    <div
      className={classNames(
        "overflow-hidden rounded-xl border border-brand-800 bg-noir-50",
        paddingClass,
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate">
          <TableHeaders data={data} compact={compact} />
          <tbody className="bg-white">
            {currentDataSlice.map((datum, index) => (
              <TableRow
                key={`table-row-${index}`}
                datum={datum}
                index={index}
                compact={compact}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Paginator
          resultsPerPage={resultsPerPage}
          totalResults={data.length}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

const TableHeaders = ({
  data,
  compact,
}: {
  data: object[];
  compact?: boolean;
}) => {
  const paddingClass = compact
    ? "px-1 m:px-2 lg:px-4"
    : "py-3.5 pl-4 pr-3 sm:pl-6 lg:pl-8";
  return (
    <thead>
      <tr>
        {Object.keys(data[0]).map((column) => (
          <th
            key={column}
            scope="col"
            className={classNames(
              "relative z-10 border-b border-noir-300 bg-noir-50 bg-opacity-75  text-left text-sm font-semibold text-noir-900 ",
              paddingClass
            )}
          >
            {column.replaceAll("_", " ")}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableRow = ({
  datum,
  index,
  compact,
}: {
  datum: object;
  index: number;
  compact?: boolean;
}) => {
  const paddingClass = compact
    ? "px-1 m:px-2 py-1 lg:px-4"
    : "py-3.5 pl-4 pr-3 sm:pl-6 lg:pl-8";

  return (
    <tr key={`row-${index}`}>
      {Object.entries(datum).map(([column, value]) => (
        <td
          key={`row-${index}-${column}`}
          className={classNames(
            "border-b border-noir-200 text-xs font-medium",
            paddingClass
          )}
        >
          <ValueRenderer rawValue={value} />
        </td>
      ))}
    </tr>
  );
};

const ValueSchema = z.union([
  z.object({
    url: z.string(),
    title: z.string(),
  }),
  z.array(z.string()),
  z.string(),
  z.null().transform(() => "N/A"),
  z.number(),
]);
export type TableValue = z.infer<typeof ValueSchema>;
const ValueRenderer = ({ rawValue }: { rawValue: unknown }) => {
  const parsed = ValueSchema.safeParse(rawValue);
  if (!parsed.success) {
    console.error("Invalid value", rawValue);
    console.error(parsed.error);
    return (
      <span className="text-red-500">
        `Unexpected value type: ${typeof rawValue}`
      </span>
    );
  }
  const value = parsed.data;
  if (typeof value === "string") {
    return <span className="text-zinc-800">{value}</span>;
  } else if (typeof value === "number") {
    return <span className="text-zinc-800">{value}</span>;
  } else if (Array.isArray(value)) {
    return (
      <ul>
        {value.map((item, i) => (
          <li key={`list-item-${i}`}>{item}</li>
        ))}
      </ul>
    );
  } else if (value?.url && value?.title) {
    return (
      <a href={value.url} className="text-brand-600 hover:text-brand-900">
        {value.title}
      </a>
    );
  } else {
    throw new Error(`Unexpected value type: ${typeof value}`);
  }
};
