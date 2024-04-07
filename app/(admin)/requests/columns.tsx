"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatCurrency } from "@/utils/formatCurrency";
import { IRequestData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<IRequestData>[] = [
  {
    accessorKey: "project_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Project Name" />;
    },
  },

  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Description" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex  flex-col">
          <span className="w-44 truncate">{row.getValue("description")}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "unit_price",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Unit Price" withSort={true} />
      );
    },
    cell: ({ row }) => {
      const { unit_price } = row.original;
      const price = formatCurrency(unit_price);
      return (
        <div className="">
          <span>{price}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "total_price",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Total Price" withSort={true} />
      );
    },
    cell: ({ row }) => {
      const { total_price } = row.original;
      const price = formatCurrency(total_price);
      return (
        <div className="">
          <span>{price}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Amount" />;
    },
    cell: ({ row }) => {
      const { amount } = row.original;
      const price = formatCurrency(amount);
      return (
        <div className="">
          <span>{price}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "staff_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Staff Name" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <span className="font-semibold">{row.getValue("staff_name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <Link
          href={`requests/request-details/${row.getValue("id")}`}
          className="text-primaryLight-500 underline flex gap-1.5 items-center font-medium"
        >
          <ViewUserPageIcon />
          View
        </Link>
      );
    },
  },
];
