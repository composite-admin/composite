"use client";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { DataTablePagination } from "./PaginationComponent";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  clickAction?: any;
  showSearch?: boolean;
  isLoading?: boolean;
  errorMessage?: string;
  isError?: boolean;
  showFilters?: boolean;
  withTitle?: {
    title: string;
    data: string | number;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  clickAction,
  showSearch = true,
  showFilters = false,
  errorMessage,
  isLoading,
  isError,
  withTitle,
}: DataTableProps<TData, TValue>) {
  // const setId = (id: string) => {
  //   switch (id) {
  //     case "createdAt":
  //       return "createdAt";
  //     case "start_date":
  //       return "Start Date";
  //     case "end_date":
  //       return "End Date";
  //     default:
  //       return null;
  //   }
  // };
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "createdAt",
      desc: true,
    },
    {
      id: "updatedAt",
      desc: true,
    },
    {
      id: "start_date",
      desc: true,
    },
  ]);
  console.log();

  const [globalFilter, setGlobalFilter] = React.useState<string>("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });
  return (
    <div className="">
      <div
        className={withTitle ? "flex items-center justify-between mt-4" : ""}
      >
        {withTitle && (
          <p className="font-bold text-xl capitalize">
            {withTitle.title} ({withTitle.data})
          </p>
        )}
        <div className="my-5 flex items-center gap-4 text-zinc-500">
          {showSearch && (
            <Input
              type="text"
              placeholder="Search..."
              className="w-full md:min-w-[24rem] placeholder:text-textColor"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              withIcon
              icon={<Search className="w-4 h-4 text-textColor" />}
            />
          )}

          {/* {showSearch && (
            <>

              <Input
                type="text"
                placeholder="Search..."
                className="w-full md:min-w-[25rem]  placeholder:text-textColor"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                withIcon
                icon={<Search className="w-4 h-4 text-textColor" />}
              />
            </>
          )}
          {showFilters && (
            <>
              <div className="flex items-center gap-2">
                <IoFilterOutline />
                <span>Filter</span>
              </div>
              <div className="flex items-center gap-2">
                <FaSort />
                <span>Sort</span>
              </div>
            </>
          )} */}
        </div>
      </div>
      <div className="rounded-lg border border-borderColor shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-xs sm:text-sm font-semibold text-[#344054]"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div
                    role="status"
                    className=" w-full flex justify-center items-center"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={clickAction}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-6">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {errorMessage}
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
