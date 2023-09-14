import { usePaginator } from "@hooks/usePaginator";
import { Paginator } from "@ui/Paginator";
import { z } from "zod";

export const Table = <T extends object>({
  data,
  resultsPerPage,
}: {
  data: T[];
  resultsPerPage: number;
}) => {
  const { currentPage, totalPages, nextPage, prevPage, currentDataSlice } =
    usePaginator<T>({
      data,
      resultsPerPage,
    });

  if (data.length === 0) {
    return (
      <div className="flex items-start px-2">
        <div className="mt-8 flex flex-col items-center">
          h{" "}
          <div className="inline-block py-2 align-middle">
            <div className="ring-black ring-1 ring-opacity-5">
              No results found.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-brand-800 bg-noir-50 p-1">
      <table
        className="min-w-full border-separate"
        style={{ borderSpacing: 0 }}
      >
        <TableHeaders data={data} />
        <tbody className="bg-white">
          {currentDataSlice.map((datum, index) => (
            <TableRow key={`table-row-${index}`} datum={datum} index={index} />
          ))}
        </tbody>
      </table>
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
const TableHeaders = ({ data }: { data: object[] }) => (
  <thead>
    <tr>
      {Object.keys(data[0]).map((column) => (
        <th
          key={column}
          scope="col"
          className="relative z-10 border-b border-noir-300 bg-noir-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-noir-900 sm:pl-6 lg:pl-8"
        >
          {column.replace("_", " ")}
        </th>
      ))}
    </tr>
  </thead>
);

const TableRow = ({ datum, index }: { datum: object; index: number }) => (
  <tr key={`row-${index}`}>
    {Object.entries(datum).map(([column, value]) => (
      <td
        key={`row-${index}-${column}`}
        className="border-b border-noir-200 py-3.5 pl-4 pr-3 text-xs font-medium sm:pl-6 lg:pl-8"
      >
        <ValueRenderer value={value} />
      </td>
    ))}
  </tr>
);

const ValueSchema = z.union([
  z.object({
    url: z.string(),
    title: z.string(),
  }),
  z.array(z.string()),
  z
    .string()
    .nullable()
    .transform((val: string | null) => val ?? "No Data"),
  z.number(),
]);
export type TableValue = z.infer<typeof ValueSchema>;
const ValueRenderer = ({ value }: { value: TableValue }) => {
  if (typeof value === "string" || value === null) {
    return <span className="text-zinc-800">{value ?? "No Data"}</span>;
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
    return (
      <span className="text-red-500">
        `Unexpected value type: ${typeof value}`
      </span>
    );
  }
};
