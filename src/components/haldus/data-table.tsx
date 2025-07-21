"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Eraser, Funnel, Search } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// Search input placeholders
function getPlaceholderText(column: string): string {
  const placeholders = {
    email: "Filtreeri emaile...",
    firstName: "Filtreeri eesnimesid...",
    ticketType: "Filtreeri pileti tüüpi...",
    team: "Filtreeri tiimi nimesid...",
  };
  return placeholders[column as keyof typeof placeholders] || "Otsi...";
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [searchColumn, setSearchColumn] = React.useState<string>("email");
  const [searchValue, setSearchValue] = React.useState<string>("");

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
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Search className="h-6 w-6 mr-2" />
        <Input
          placeholder={getPlaceholderText(searchColumn)}
          value={searchValue}
          onChange={(event) => {
            const value = event.target.value;
            setSearchValue(value);

            // Clear all column filters first
            table.getColumn("email")?.setFilterValue("");
            table.getColumn("firstName")?.setFilterValue("");
            table.getColumn("ticketType")?.setFilterValue("");
            table.getColumn("team")?.setFilterValue("");

            // Set filter for selected column
            table.getColumn(searchColumn)?.setFilterValue(value);
          }}
          className="max-w-sm rounded-r-none"
        />
        <Select value={searchColumn} onValueChange={setSearchColumn}>
          <SelectTrigger className="w-48 border-l-0 rounded-l-none">
            <Funnel />
            <SelectValue placeholder="Vali otsingu väli" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="firstName">Eesnimi</SelectItem>
            <SelectItem value="ticketType">Pileti tüüp</SelectItem>
            <SelectItem value="team">Tiim</SelectItem>
          </SelectContent>
        </Select>
        {searchValue && (
          <Button
            variant="ghost"
            size="lg"
            onClick={() => {
              setSearchValue("");
              table.getColumn(searchColumn)?.setFilterValue("");
            }}
            className="ml-2"
          >
            <Eraser />
            Tühjenda
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Tulemusi ei leitud.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Näidatakse {table.getFilteredRowModel().rows.length} rida(de) kokku{" "}
          {data.length} reast.
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>
            Lehekülg {table.getState().pagination.pageIndex + 1} /{" "}
            {table.getPageCount()}
          </span>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Eelmine
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Järgmine
          </Button>
        </div>
      </div>
    </div>
  );
}
