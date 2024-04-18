"use client";

import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import {  HiPencilAlt,  } from "react-icons/hi";

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
    accessorKey: "worker",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Worker" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <Link href={`/workers/${row.original["id"]}`}>
          <div className="flex items-center gap-4">
            <AvatarComponent />
            <div className="flex flex-col">
              <span className="w-32 font-semibold text-primaryLight-500 truncate underline">
                {row.original["worker_name"]}
              </span>
              <span className="text-xs font-semibold text-gray-500">{row.original["worker_code"]}</span>
            </div>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "workerCompany",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Company" withSort={false} />;
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
    accessorKey: "workerAddress",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Address" withSort={false} />;
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
    accessorKey: "emailAddress",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Email Address" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">{row.original["worker_email"]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "officePhone",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Office Phone" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">{row.original["worker_ofc_phone"]}</span>
        </div>
      );
    },
  },

  // {
  //   accessorKey: "createdOn",
  //   header: ({ column }) => {
  //     return <ColumnHeader column={column} title="Added On" />;
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <div className="">
  //         <span className=" ">{formatDate(row.original["createdAt"])}</span>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "action",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Action" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <Link href={`/workers/${row.original["id"]}/edit`}>
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
