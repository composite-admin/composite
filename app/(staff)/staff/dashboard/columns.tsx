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
    accessorKey: "request_type",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Request" />;
    },
    cell: ({ row }) => {
      const { request_type, request_code, id } = row.original;
      return (
        <Link
          href={`/staff/requests/request-details/${id}`}
          className="flex flex-col"
        >
          <span className="w-40 truncate underline text-primaryLight-500 font-semibold">
            {request_type}
          </span>
          <span className="uppercase text-textColor font-semibold">
            {request_code}
          </span>
        </Link>
      );
    },
  },
  {
    accessorKey: "project_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Project" />;
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
          <span className="w-32 truncate">{row.getValue("description")}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Quantity" withSort={false} />;
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
    accessorKey: "createdAt",
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
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      const { status } = row.original;
      const currentStatus = status.toUpperCase();
      return (
        <div>
          <span
            className={`rounded-xl font-semibold px-2.5 py-1 ${
              currentStatus === "APPROVED"
                ? "text-green-700 bg-green-200 "
                : currentStatus === "PENDING"
                ? "text-[#865503] bg-[#FEF6E7]"
                : "text-red-700 bg-red-200"
            }`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
];
