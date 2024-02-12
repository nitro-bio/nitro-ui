import {
  ArrowDownIcon,
  ArrowsUpDownIcon,
  ArrowUpIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { Filter, useFiltered } from "@hooks/useFiltered";
import { usePaginator } from "@hooks/usePaginator";
import { useSorted } from "@hooks/useSorted";
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
  const { filteredData, filters, updateFilter } = useFiltered<T>(data);
  const { sortedData, sortKey, setSortKey, sortOrder, setSortOrder } =
    useSorted<T>(filteredData);
  const { currentPage, totalPages, nextPage, prevPage, currentDataSlice } =
    usePaginator<T>({
      data: sortedData,
      resultsPerPage,
    });

  if (data.length === 0) {
    return (
      <div
        className={classNames(
          "mt-8 flex items-center justify-center rounded-xl border border-brand-800 bg-noir-50 text-sm font-medium text-noir-900",
          paddingClass,
          className,
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
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate">
          <TableHeaders
            compact={compact}
            sortKey={sortKey}
            setSortKey={setSortKey}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            filters={filters}
            updateFilter={updateFilter}
          />
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
          totalResults={sortedData.length}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

const TableHeaders = <T extends object>({
  sortKey,
  setSortKey,
  sortOrder,
  setSortOrder,
  filters,
  updateFilter,
  compact,
}: {
  sortKey: keyof T | null;
  setSortKey: (key: keyof T | null) => void;
  sortOrder: "asc" | "dsc";
  setSortOrder: (order: "asc" | "dsc") => void;
  filters: Filter<T>[];
  updateFilter: (key: keyof T, filterString: string | null) => void;

  compact?: boolean;
}) => {
  const paddingClass = compact
    ? "px-1 m:px-2 lg:px-4"
    : "py-3.5 pl-4 pr-3 sm:pl-6 lg:pl-8";

  return (
    <thead>
      <tr>
        {filters.map(({ key }: Filter<T>) => (
          <th
            key={key.toString()}
            scope="col"
            className={classNames(
              "border-b border-noir-300 bg-noir-50 bg-opacity-75 text-left text-sm font-semibold text-noir-900",
              paddingClass,
            )}
          >
            <span className="flex items-center">
              {key.toString().replaceAll("_", " ")}

              <SortButton
                column={key as keyof T}
                sortKey={sortKey}
                sortOrder={sortOrder}
                setSortKey={setSortKey}
                setSortOrder={setSortOrder}
              />
              <FilterButton
                filter={filters.find((f) => f.key === (key as keyof T))}
                updateFilter={updateFilter}
              />
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
};

const SortButton = <T extends object>({
  column,
  sortKey,
  sortOrder,
  setSortKey,
  setSortOrder,
}: {
  column: keyof T;
  sortKey: keyof T | null;
  sortOrder: "asc" | "dsc";
  setSortKey: (key: keyof T | null) => void;
  setSortOrder: (order: "asc" | "dsc") => void;
}) => (
  <button
    className={classNames(sortKey === column ? "text-brand-600" : "")}
    onClick={() => {
      if (sortKey === column) {
        setSortOrder(sortOrder === "asc" ? "dsc" : "asc");
      } else {
        setSortKey(column);
        setSortOrder("asc");
      }
    }}
  >
    {sortKey === column ? (
      <>
        {sortOrder === "asc" ? (
          <ArrowUpIcon className="ml-1 h-4 w-4 opacity-60 hover:opacity-100" />
        ) : (
          <ArrowDownIcon className="ml-1 h-4 w-4 opacity-60 hover:opacity-100" />
        )}
      </>
    ) : (
      <ArrowsUpDownIcon className="ml-1 h-4 w-4 opacity-60 hover:opacity-100" />
    )}
  </button>
);

const FilterButton = <T extends object>({
  filter,
  updateFilter,
}: {
  filter: Filter<T> | undefined;
  updateFilter: (key: keyof T, filterString: string | null) => void;
}) => {
  if (!filter) {
    throw new Error("Filter not found");
  }
  const filterActive =
    filter.filterString !== null && filter.filterString !== "";
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="m-1">
        <FunnelIcon
          className={classNames(
            "ml-1 h-4 w-4 opacity-60 hover:opacity-100",
            filterActive && "fill-brand-600 text-brand-600",
          )}
        />
      </div>
      <div tabIndex={0} className="dropdown-content z-[1] flex gap-1">
        <input
          className={classNames(
            "input-sm z-10 w-32 rounded-md border border-brand-600 bg-white opacity-100",
          )}
          type="text"
          value={filter.filterString ?? ""}
          onChange={(e) => {
            updateFilter(filter.key, e.target.value);
          }}
        />
        <button
          className={classNames(
            "text-white! group btn btn-circle btn-outline btn-error btn-sm",
          )}
          onClick={() => {
            updateFilter(filter.key, null);
          }}
        >
          <XMarkIcon className="mx-auto h-4 w-4 group-hover:text-white" />
        </button>
      </div>
    </div>
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
            paddingClass,
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
