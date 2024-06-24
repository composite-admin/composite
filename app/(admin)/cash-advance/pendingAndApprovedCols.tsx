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
import EditCell, { ViewCell } from "../facility/all-flats/EditCell";

export const pendingAndApprovedColumns: ColumnDef<ICashAdvanceData>[] = [
  {
    accessorKey: "cash_advance_type",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Request Type" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex  gap-0.5 flex-col">
          <span className="font-semibold">
            {row.original["cash_advance_type"]}
          </span>
          <span className="uppercase">{row.original["request_code"]}</span>
        </div>
      );
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
    accessorKey: "unused_cash",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Unused Cash Requested For" />;
    },
    cell: ({ row }) => {
      const amt = formatCurrency(row.getValue("unused_cash"));
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
    accessorKey: "decision",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      const { decision, cash_id } = row.original;
      return (
        <span
          className={`${
            decision === "Approved" ? "text-success" : "text-error"
          } font-semibold`}
        >
          {decision === "Approved" ? (
            <Link
              href={`/cash-advance/${cash_id}/approved-details`}
              className="underline text-primaryLight"
            >
              View
            </Link>
          ) : (
            decision ?? "Pending"
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "cash_id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" />;
    },
    cell: ({ row }) => {
      const { cash_id, decision } = row.original;
      return (
        <>
          {decision === "Approved" ? (
            <p className="font-semibold text-textColor-500 uppercase disabled cursor-not-allowed">
              Return Cash Complete
            </p>
          ) : (
            <TableAction
              cash_id={String(cash_id)}
              formType={"refund" as CashAdvanceFormTypes}
              currentFormType={"refund" as CashAdvanceFormTypes}
              onActionClick={() => {
                return cash_id;
              }}
            >
              <p className="font-semibold text-primaryLight underline uppercase ">
                Approve / Reject
              </p>
            </TableAction>
          )}
        </>
      );
    },
  },

  // {
  //   accessorKey: "cash_id",
  //   header: ({ column }) => {
  //     return <ColumnHeader column={column} title="Actions" />;
  //   },
  //   cell: ({ row }) => {
  //     const { cash_id, action_type } = row.original;
  //     return (
  //       <TableAction
  //         formType={"refund" as CashAdvanceFormTypes}
  //         currentFormType={"refund" as CashAdvanceFormTypes}
  //         cash_id={String(cash_id)}
  //         onActionClick={() => {
  //           return cash_id;
  //         }}
  //       >
  //         <p className="cursor-pointer font-semibold text-primaryLight uppercase">
  //           Approve Refund
  //         </p>
  //       </TableAction>
  //     );
  //   },
  // },
];
