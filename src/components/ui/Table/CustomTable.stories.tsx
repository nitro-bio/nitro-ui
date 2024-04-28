import { ArrowsUpDownIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  Cell,
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@ui/Button/Button";
import { Card } from "@ui/Card";
import { Checkbox } from "@ui/Checkbox/Checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@ui/Dropdown/Dropdown";
import { Input } from "@ui/Input/Input";
import { ReactNode, useState } from "react";
import { CustomTable } from "@ui/Table";

export default {
  title: "UIElements/Table/Custom Table",
};

type BioData = {
  proteinName: string | null;
  accession: string | null;
  rnaSequence: string | null;
  dnaSequence: string | null;
  organism: string | null;
  expressionSystem: string | null;
  molecularWeight: number;
  secondaryStructure: string | null;
  bioActivity: string | null;
  halfLife: number;
  iso_electric_point: number;
  meltingPoint: number;
  bindingSite: string | null;
  modification: string | null;
};

const generateBioData = (n: number): BioData[] => {
  const proteins = ["ProteinA", "ProteinB", "ProteinC"];
  const organisms = ["E. coli", "Human", "Mouse", null];
  const expressionSystems = ["Mammalian", "Bacterial", "Yeast", null];
  const secondaryStructures = ["Alpha helix", "Beta sheet", "Loop", null];
  const bioActivities = ["Enzymatic", "Structural", "Receptor", null];

  function randomChoice<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const randomSequence = (length: number) => {
    const bases = ["A", "T", "C", "G"];
    return [...Array(length)].map(() => randomChoice(bases)).join("");
  };

  return Array.from({ length: n }).map((_, i) => ({
    proteinName: `${randomChoice(proteins)} ${i}`,
    accession: `ACC${Math.floor(1000 + Math.random() * 9000)}`,
    rnaSequence: randomSequence(30),
    dnaSequence: randomSequence(30),
    organism: randomChoice(organisms),
    expressionSystem: randomChoice(expressionSystems),
    molecularWeight: parseFloat((10 + Math.random() * 90).toFixed(2)),
    secondaryStructure: randomChoice(secondaryStructures),
    bioActivity: randomChoice(bioActivities),
    halfLife: parseFloat((1 + Math.random() * 48).toFixed(2)),
    iso_electric_point: parseFloat((4 + Math.random() * 6).toFixed(2)),
    meltingPoint: parseFloat((40 + Math.random() * 60).toFixed(2)),
    bindingSite: randomChoice(proteins),
    modification: randomChoice(["Methylated", "Phosphorylated", "Acetylated"]),
  }));
};
const data: BioData[] = generateBioData(1000);
const columns: ColumnDef<BioData, ReactNode>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }: { row: Row<BioData> }) => (
      <div className="flex items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorFn: (row) => row.proteinName,
    id: "Protein Name",
    cell: ({ cell }: { cell: Cell<BioData, ReactNode> }): ReactNode => {
      return <div className="ml-4">{cell.renderValue()}</div>;
    },
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Protein Name
        <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorFn: (row) => row.accession,
    id: "Accession",
    cell: ({ cell }: { cell: Cell<BioData, ReactNode> }): ReactNode => (
      <div className="ml-4">{cell.renderValue()}</div>
    ),
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Accession
        <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorFn: (row) => row.rnaSequence,
    id: "RNA Sequence",
    cell: ({ cell }: { cell: Cell<BioData, ReactNode> }): ReactNode => (
      <div className="ml-4 font-mono">{cell.renderValue()}</div>
    ),
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        RNA Sequence
        <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorFn: (row) => row.dnaSequence,
    id: "DNA Sequence",
    cell: ({ cell }: { cell: Cell<BioData, ReactNode> }): ReactNode => (
      <div className="ml-4 font-mono">{cell.renderValue()}</div>
    ),
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        DNA Sequence
        <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorFn: (row) => row.organism,
    id: "Organism",
    cell: ({ cell }: { cell: Cell<BioData, ReactNode> }): ReactNode => (
      <div className="ml-4">{cell.renderValue()}</div>
    ),
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Organism
        <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorFn: (row) => row.expressionSystem,
    id: "Expression System",
    cell: ({ cell }: { cell: Cell<BioData, ReactNode> }): ReactNode => (
      <div className="">{cell.renderValue()}</div>
    ),
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Expression System
        <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorFn: (row) => row.molecularWeight,
    id: "Modelar Weight",
    cell: ({ cell }: { cell: Cell<BioData, ReactNode> }): ReactNode => (
      <div className="">{cell.renderValue()}</div>
    ),
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Molecular Weight
        <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorFn: (row) => row.secondaryStructure,
    id: "Secondary Structure",
    cell: ({ cell }: { cell: Cell<BioData, ReactNode> }): ReactNode => (
      <div className="">{cell.renderValue()}</div>
    ),
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Secondary Structure
        <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorFn: (row) => row.bioActivity,
    id: "Bio Activity",
    cell: ({ cell }: { cell: Cell<BioData, ReactNode> }): ReactNode => (
      <div className="">{cell.renderValue()}</div>
    ),

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Bio Activity
        <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorFn: (row) => row.halfLife,
    id: "Half Life",
    cell: ({ cell }: { cell: Cell<BioData, ReactNode> }): ReactNode => (
      <div className="">{cell.renderValue()}</div>
    ),

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Half Life
        <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorFn: (row) => row.iso_electric_point,
    id: "ISO Electric Point",
    cell: ({ cell }: { cell: Cell<BioData, ReactNode> }): ReactNode => (
      <div className="">{cell.renderValue()}</div>
    ),

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ISO Electric Point
        <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorFn: (row) => row.meltingPoint,
    id: "Melting Point",
    cell: ({ cell }: { cell: Cell<BioData, ReactNode> }): ReactNode => (
      <div className="">{cell.renderValue()}</div>
    ),
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Melting Point
        <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorFn: (row) => row.bindingSite,
    id: "Binding Site",
    cell: ({ cell }: { cell: Cell<BioData, ReactNode> }): ReactNode => (
      <div className="">{cell.renderValue()}</div>
    ),

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Binding Site
        <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorFn: (row) => row.modification,
    id: "Modification",
    cell: ({ cell }: { cell: Cell<BioData, ReactNode> }): ReactNode => (
      <div className="">{cell.renderValue()}</div>
    ),
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Modification
        <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
];
export function DataTableDemo() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [currentColumnFilter, setCurrentColumnFilter] =
    useState<string>("Protein Name");

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
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Card>
      <div className="flex items-end py-4">
        <span className="flex  items-end space-x-4">
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
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="my-auto ml-auto ">
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize text-noir-100"
                      checked={currentColumnFilter === column.id}
                      onCheckedChange={() => setCurrentColumnFilter(column.id)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns to Show <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize text-noir-100"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CustomTable table={table} />
    </Card>
  );
}
