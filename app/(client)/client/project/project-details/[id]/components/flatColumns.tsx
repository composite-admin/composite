"use client";

import { IProjectFlatData } from "@/app/(admin)/project/apartment/[id]/page";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const flatColumns: ColumnDef<IProjectFlatData>[] = [
  {
    accessorKey: "flat_code",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Flat Code" />;
    },
    cell: ({ row }) => {
      const { flat_code } = row.original;
      return <span className="w-32 uppercase font-semibold">{flat_code}</span>;
    },
  },
  {
    accessorKey: "flat_desc",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Flat Description" />;
    },
  },
  // {
  //   accessorKey: "",
  //   header: ({ column }) => {
  //     return <ColumnHeader column={column} title="Statement" />;
  //   },
  // },
];
