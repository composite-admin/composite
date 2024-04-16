"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiEye, HiOutlineCog, HiPencilAlt, HiUserAdd } from "react-icons/hi";

export type ReportType = {
  id: string;
  stakeHolderName: string;
  address: string;
  officePhone: string;
  contactPerson: string;
  contactPhone: string;
  addedOn: string;
  actions: string;
};

export const columns: ColumnDef<ReportType | any>[] = [
  {
    accessorKey: "jobCode",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Job Code" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">{row.original["worker_company"]}</span>
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
          <span className="font-semibold ">{row.original["worker_company"]}</span>
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
          <span className="font-semibold ">{row.original["worker_company"]}</span>
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
          <span className="font-semibold ">{row.original["worker_company"]}</span>
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
          <span className="font-semibold ">{row.original["worker_address"]}</span>
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
