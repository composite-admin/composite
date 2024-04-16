"use client";

import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatToNaira } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { IWorkerJobData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiEye, HiOutlineCog, HiPencilAlt, HiUserAdd } from "react-icons/hi";

export const columns: ColumnDef<IWorkerJobData>[] = [
  {
    accessorKey: "jobCode",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Job Code" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">{row.original["job_code"]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "service",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Service" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">{row.original["worker_service"]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "serviceCharge",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Service Charge" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">{formatToNaira(parseFloat(row.original["worker_service_charge"]))}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amountPaid",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Amount Paid" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">{formatToNaira(parseFloat(row.original["amount_paid"]))}</span>
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
          <span className="font-semibold ">{formatToNaira(parseFloat(row.original["outstanding_balance"]))}</span>
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
        <div className="max-w-sm">
          <span className="font-semibold truncate">{row.original["comment"]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdOn",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Added On" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className=" ">{formatDate(row.original["createdAt"])}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Action" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <Link href="#">
            <span className="hover:underline font-semibold text-primaryLight-500 flex items-center">
              <HiPencilAlt />
              Edit{" "}
            </span>
          </Link>
        </div>
      );
    },
  },
];
