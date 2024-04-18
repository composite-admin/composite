"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useAddWorkerModal } from "@/store/inventory/UseInventoryModal";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteIcon } from "lucide-react";
import Link from "next/link";
import { HiOutlineCog, HiPencilAlt, HiUserAdd } from "react-icons/hi";

export type ReportType = {
  id: string;
  description: string;
  quantity: string;
  unitPrice: string;
  totalCost: string;
  dateAdded: string;
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "request_type",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Request Type" />;
    },
    cell: ({ row }) => {
      return (
        // <Link href={`/project/${row.original["id"]}`}>
        <div className="flex gap-2 items-center">
          <div>
            <p className="font-semibold underline text-primaryLight">
              Cash Advance
            </p>
            <p>RCPD119548</p>
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
          <span className="font-semibold ">Bode Peters</span>
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
          <span className="w-16">Alice Ogaga</span>
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
            Approved
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
          <span className="font-semibold ">N100,000</span>
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
          <span className="font-semibold ">N100,000</span>
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
          <span className="font-semibold ">N100,000</span>
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
            6 Jan 2022
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "comment",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Comment" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="hover:underline font-semibold flex items-center">
            Done and Closed
          </span>
        </div>
      );
    },
  },
];
