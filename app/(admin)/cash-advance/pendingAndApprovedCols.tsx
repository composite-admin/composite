"use client";

import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { ICashAdvanceData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import TableAction from "./details/(forms_and_modals)/TableAction";
import { CashAdvanceFormTypes } from "@/store/cash-advance/useCashAdvanceStore";
import { ViewCell } from "../facility/all-flats/EditCell";

export const pendingAndApprovedColumns: ColumnDef<ICashAdvanceData>[] = [
  {
    accessorKey: "request_code",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Request Code" />;
    },
    cell: ({ row }) => {
      return (
        <span className="font-semibold capitalize">
          {row.original["request_code"]}
        </span>
      );
    },
  },
  {
    accessorKey: "cash_advance_type",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Request Type" />;
    },
  },

  {
    accessorKey: "amount_collected",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Amount Collected" />;
    },
    cell: ({ row }) => {
      const amt = formatCurrency(row.getValue("amount_collected"));
      return (
        <div className="flex gap-2 items-center">
          <span>{amt}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Description" />;
    },
  },
  {
    accessorKey: "action_by",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Submitted by" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <span>{row.getValue("action_by") ?? "N/A"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Submitted on" />;
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const fromatted = formatDate(createdAt);
      return <span>{fromatted}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Status" />;
    },
  },
  {
    accessorKey: "cash_id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" />;
    },
    cell: ({ row }) => {
      const { cash_id } = row.original;
      return <ViewCell isLink href={`/cash-advance/${cash_id}`} />;
    },
  },

  {
    accessorKey: "cash_id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" />;
    },
    cell: ({ row }) => {
      const { cash_id, action_type } = row.original;
      return (
        <TableAction
          formType={"refund" as CashAdvanceFormTypes}
          currentFormType={"refund" as CashAdvanceFormTypes}
          cash_id={String(cash_id)}
          onActionClick={() => {
            return cash_id;
          }}
        >
          <p className="cursor-pointer font-semibold text-primaryLight uppercase">
            Approve Refund
          </p>
        </TableAction>
      );
    },
  },
];