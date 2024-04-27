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
    <>
      <Table>
        <TableHeader>
          <TableRow>
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
      </Table>
      <TableFooter className="flex h-14 items-center pl-2">
        {data.length} rows
      </TableFooter>
    </>
  );
};
