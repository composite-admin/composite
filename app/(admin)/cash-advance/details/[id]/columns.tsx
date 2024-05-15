"use client";

import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { ICashAdvanceBreakdownData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<ICashAdvanceBreakdownData>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Description" />;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Amount" />;
    },
    cell: ({ row }) => {
      const amt = formatCurrency(row.getValue("amount"));
      return (
        <div className="flex gap-2 items-center">
          <span>{amt}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "added_by",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Staff Name" />;
    },
    cell: ({ row }) => {
      const { added_by } = row.original;
      return (
        <div className="flex gap-1.5 items-center">
          <AvatarComponent />
          <span>{added_by}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Date Added" />;
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const fromatted = formatDate(createdAt);
      return <span>{fromatted}</span>;
    },
  },

  // {
  //   accessorKey: "id",
  //   header: ({ column }) => {
  //     return <ColumnHeader column={column} title="Actions" />;
  //   },
  //   cell: ({ row }) => {
  //     const { id } = row.original;

  //     return (
  //       <div className="flex gap-2 items-center w-32">
  //         <Link href="#" className="w-32 font-semibold text-primaryLight">
  //           {id}
  //         </Link>
  //       </div>
  //     );
  //   },
  // },
];
