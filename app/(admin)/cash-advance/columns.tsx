"use client";

import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatCurrency } from "@/utils/formatCurrency";
import { ICashAdvanceData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<ICashAdvanceData>[] = [
  {
    accessorKey: "req",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Request Type" />;
    },
    cell: ({ row }) => {
      return (
        <Link
          href="/cash-advance/details"
          className="flex flex-col font-semibold gap-2 items-center capitalize"
        >
          <span className="truncate w-20 underline text-primaryLight">
            {row.getValue("requestType")}
          </span>
          <span className="truncate w-20">2140231098</span>
        </Link>
      );
    },
  },
  {
    accessorKey: "project_code",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Project Code" />;
    },
  },
  {
    accessorKey: "staff_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Staff Name" />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Status" />;
    },
  },
  {
    accessorKey: "amount_collected",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Amount Called" />;
    },
    cell: ({ row }) => {
      const amt = formatCurrency(row.getValue("amountCall"));
      return (
        <div className="flex gap-2 items-center">
          <span>{amt}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount_recorded",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Amount Received" />;
    },
    cell: ({ row }) => {
      const amt = formatCurrency(row.getValue("amountRec"));
      return (
        <div className="flex gap-2 items-center">
          <span>{amt}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "balance",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Balance" />;
    },
    cell: ({ row }) => {
      const bal = formatCurrency(row.getValue("balance"));
      return (
        <div className="flex gap-2 items-center">
          <span>{bal}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Date Added" />;
    },
  },
  {
    accessorKey: "comment",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Comment" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center w-32">
          <span className="truncate">{row.getValue("comment")}</span>
        </div>
      );
    },
  },
];
