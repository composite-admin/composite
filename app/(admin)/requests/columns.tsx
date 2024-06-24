"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { IRequestData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { string } from "zod";

export const columns: ColumnDef<IRequestData>[] = [
  {
    accessorKey: "request_type",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Request Type" />;
    },
    cell: ({ row }) => {
      const { request_type, request_code, id } = row.original;
      return (
        <Link href={`requests/request-details/${id}`} className="flex flex-col">
          <span className="capitalize underline text-primaryLight-500 font-semibold">
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
      return <ColumnHeader column={column} title="Project Name" />;
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Status" withSort={false} />;
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div className="flex  flex-col">
          <span
            className={`text-center font-semibold rounded-lg p-0.5 ${
              status === "APPROVED"
                ? "text-green-500 bg-green-100"
                : status === "PENDING"
                ? "text-orange-500  bg-orange-100"
                : "text-red-500  bg-red-100"
            }`}
          >
            {row.getValue("status")}
          </span>
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
      return <ColumnHeader column={column} title="Created By" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <span className="font-semibold">{row.getValue("staff_name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Created On" />;
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const formatted = formatDate(createdAt);
      return <span className="">{formatted}</span>;
    },
  },
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => {
  //     return <ColumnHeader column={column} title="Actions" withSort={false} />;
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <Link
  //         href={`requests/request-details/${row.getValue("id")}`}
  //         className="text-primaryLight-500 underline flex gap-1.5 items-center font-medium"
  //       >
  //         <ViewUserPageIcon />
  //         View
  //       </Link>
  //     );
  //   },
  // },
];
