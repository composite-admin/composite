"use client";

import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { IProjectData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<IProjectData>[] = [
  {
    accessorKey: "project_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Project Name" />;
    },
    cell: ({ row }) => {
      return (
        <Link href={`/project/${row.original["id"]}`}>
          <div className="flex  flex-col">
            <span className="w-32 font-semibold text-primaryLight-500 truncate underline">
              {row.original["project_name"]}
            </span>
            <span className="text-xs font-semibold text-gray-500">
              {row.original["project_code"]}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Status" />;
    },
  },
  {
    accessorKey: "materials",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Materials" />;
    },
  },
  {
    accessorKey: "labour",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Labour" />;
    },
  },
  {
    accessorKey: "toolsAndMachine",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Tools And Machine" />;
    },
  },
  {
    accessorKey: "cashAdvance",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Cash Advance" />;
    },
  },
];
