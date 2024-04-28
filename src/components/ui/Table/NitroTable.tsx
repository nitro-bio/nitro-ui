import {
  ArrowsUpDownIcon,
  ChevronDownIcon,
  FunnelIcon,
} from "@heroicons/react/20/solid";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  Column,
  Row,
  Cell,
} from "@tanstack/react-table";
import { Button } from "@ui/Button/Button";
import { Checkbox } from "@ui/Checkbox/Checkbox";
import { Dropdown } from "@ui/Dropdown/Dropdown";
import { Input } from "@ui/Input/Input";
import { CustomTable } from "@ui/Table/CustomTable";
import { ReactNode, useEffect, useState } from "react";
import { classNames } from "../../..";

export default {
  title: "UIElements/Data Table",
};
export const NitroTable = <TData extends Record<string, ReactNode>>({
  data,
  onSelectionChange,
  pageSize = 10,
}: {
  data: TData[];
  onSelectionChange?: ({
    selectedRows,
    filteredSelectedRows,
  }: {
    selectedRows: TData[];
    filteredSelectedRows: TData[];
  }) => void;
  pageSize: number;
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [currentColumnFilter, setCurrentColumnFilter] = useState<string>(
    data.length ? Object.keys(data[0])[0] : "",
  );

  let selectColumn: ColumnDef<TData> | undefined;
  if (onSelectionChange !== undefined) {
    selectColumn = {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }: { row: Row<TData> }) => (
        <div className="flex items-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      accessorFn: (row) => row,
      enableSorting: false,
      enableHiding: false,
    };
  }

  // @ts-ignore
  const columns: ColumnDef<TData>[] = [
    ...(selectColumn ? [selectColumn] : []),
    ...Object.keys(data[0]).map((key) => ({
      header: ({ column }: { column: Column<TData> }): React.ReactElement => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=""
        >
          {key}
          <ArrowsUpDownIcon className="ml-2 h-4 w-4" />

          <FunnelIcon
            className={classNames(
              "ml-2 h-4 w-4 text-brand-600/60  dark:text-brand-600/60",
              columnFilters.map((filter) => filter.id).includes(key)
                ? "opacity-100"
                : "opacity-0",
            )}
          />
        </Button>
      ),
      id: key,
      accessorFn: (row: TData) => row[key],
      canSort: true,
      canFilter: true,
      canHide: true,
      cell: ({ cell }: { cell: Cell<TData, ReactNode> }): ReactNode => {
        return <div className="ml-4">{cell.renderValue()}</div>;
      },
    })),
  ];
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const selectedRowModel = table.getSelectedRowModel();
  const filteredSelectedRowModel = table.getFilteredSelectedRowModel();
  useEffect(
    function pushSelectionChange() {
      const selectedRows: TData[] = selectedRowModel.rows.map(
        (row) => row.original,
      );
      const filteredSelectedRows: TData[] = filteredSelectedRowModel.rows.map(
        (row) => row.original,
      );
      onSelectionChange?.({ selectedRows, filteredSelectedRows });
    },
    [selectedRowModel, filteredSelectedRowModel],
  );

  return (
    <>
      <div className="flex items-end gap-4 py-4">
        <span className="flex w-full space-x-4">
          <Input
            placeholder={`Search ${currentColumnFilter}`}
            value={
              table.getColumn(currentColumnFilter)?.getFilterValue() as string
            }
            onChange={(event) =>
              table
                .getColumn(currentColumnFilter)
                ?.setFilterValue(event.target.value)
            }
            className="w-full max-w-sm"
          />
          <Dropdown
            groups={[
              {
                label: "",
                value: currentColumnFilter,
                onValueChange: setCurrentColumnFilter,
                type: "radio",
                items: table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return {
                      label: column.id,
                      id: column.id,
                    };
                  }),
              },
            ]}
            buttonLabel={<ChevronDownIcon className="h-4 w-4" />}
            menuLabel={"Columns"}
          />
        </span>
        <div className="ml-auto">
          <Dropdown
            groups={[
              {
                label: "",
                type: "checkbox",
                items: table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return {
                      label: column.id,
                      id: column.id,
                      checked: column.getIsVisible(),
                      onCheckedChange: () => column.toggleVisibility(),
                    };
                  }),
              },
            ]}
            buttonLabel={"Columns to Show"}
            menuLabel={"Columns"}
          />
        </div>
      </div>
      <CustomTable table={table} />
    </>
  );
};
NitroTable.displayName = "NitroTable";
