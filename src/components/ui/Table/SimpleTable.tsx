import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";
export const SimpleTable = <
  TData extends Record<string, string | number | null | undefined>,
>({
  data,
}: {
  data: TData[];
}) => {
  return (
    <div className="overflow-clip rounded-md">
      <Table className="relative mb-14">
        <TableHeader>
          <TableRow className="dark:hover:bg-noir-900/50">
            {Object.keys(data[0]).map((key) => (
              <TableHead key={key}>{key}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((datum, i) => (
            <TableRow key={`row-${i}`}>
              {Object.values(datum).map((value, j) => (
                <TableCell key={`cell-${j}`}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="absolute inset-x-0">
          <tr className="flex h-14 items-center justify-between px-4">
            <td className="">{data.length} rows</td>
            <td className="">{data.length} rows</td>
          </tr>
        </TableFooter>
      </Table>
    </div>
  );
};
