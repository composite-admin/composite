"use client";

import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { IContractorProjectData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<IContractorProjectData>[] = [
  {
    accessorKey: "contractor_code",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Contractor Code" />;
    },
    cell: ({ row }) => {
      return (
        <div>
          <p className="font-semibold uppercase">
            {row.original["contractor_code"]}
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "contractor_project_code",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Project Code" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <p className="flex flex-col font-semibold uppercase gap-.5">
          <span className="underline w-max text-primaryLight ">
            {row.original["project_name"]}
          </span>
          <span>{row.original["contractor_project_code"]}</span>
        </p>
      );
    },
  },

  {
    accessorKey: "created_by",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Created By" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <AvatarComponent />
          <span className="font-semibold ">{row.original["created_by"]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "contractor_amount",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Amount" withSort={false} />;
    },
    cell: ({ row }) => {
      const { contractor_amount } = row.original;
      return (
        <div className="flex gap-2 items-center">
          <span className="font-semibold">
            {formatCurrency(contractor_amount)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Added On" />;
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const fromattedDate = formatDate(createdAt);
      return <p>{fromattedDate}</p>;
    },
  },
  {
    accessorKey: "service",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Service" />;
    },
    cell: ({ row }) => {
      return <span>{row.original["service"] ?? "N/A"}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <div>
          <p className="p-1 px-1.5 rounded-lg font-semibold text-textPending bg-bgPending w-max">
            {row.original["status"] ?? "Pending"}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Action" />;
    },
    cell: ({ row }) => {
      return (
        <div className="font-semibold flex gap-1 text-primaryLight-500">
          <Link
            href={`pending-project/approve/${row.original["id"]}`}
            className="cursor-pointer"
          >
            Approve
          </Link>
          /<span className="cursor-pointer text-red-500">Reject</span>
        </div>
      );
    },
  },
];
