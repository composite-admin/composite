"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useAddWorkerModal } from "@/store/inventory/UseInventoryModal";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { ICashAdvanceData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteIcon } from "lucide-react";
import Link from "next/link";
import { HiOutlineCog, HiPencilAlt, HiUserAdd } from "react-icons/hi";

export const columns: ColumnDef<ICashAdvanceData>[] = [
  {
    accessorKey: "request_type",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Request Type" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <div>
            <p className="font-semibold underline text-primaryLight">
              {row.original["cash_advance_type"]}
            </p>
            <p className="uppercase">{row.original["project_code"]}</p>
          </div>
        </div>
        // </Link>
      );
    },
  },

  {
    accessorKey: "project_name",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Project Name" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">
            {row.original["project_name"] ?? "-"}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "staff_name",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Staff Name" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <AvatarComponent />
          <span className="w-16">{row.original["staff_name"] ?? "-"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Status" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold bg-green-100 text-green-800 rounded-xl text-sm px-2 py-1 ">
            {row.original["status"]}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount_collected",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Amount Collected"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">
            {formatCurrency(row.original["amount_collected"])}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "amount_recorded",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Amount Recorded"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">
            {formatCurrency(row.original["amount_recorded"])}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "balance",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Balance" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">
            {formatCurrency(row.original["balance"])}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "date_added",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Date Added" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="hover:underline font-semibold  flex items-center">
            {formatDate(row.original["updatedAt"])}
          </span>
        </div>
      );
    },
  },
];
