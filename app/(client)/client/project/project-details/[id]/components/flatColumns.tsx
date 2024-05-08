"use client";

import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export interface IFlatData {
  flat_code: string;
  flat_description: string;
  statement: string;
}

export const flatColumns: ColumnDef<IFlatData>[] = [
  {
    accessorKey: "flat_code",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Flat Code" />;
    },
  },
  {
    accessorKey: "flat_description",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Flat Description" />;
    },
  },
  {
    accessorKey: "statement",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Statement" />;
    },
  },
];
