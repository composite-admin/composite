"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
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

export const columns: ColumnDef<ReportType|any>[] = [
  {
    accessorKey: "workerCode",
    header: ({ column }) => {
        return <ColumnHeader column={column} title="Worker Code" />;
    },
    cell: ({ row }) => {
        return (
            <Link href={`/workers/${row.original["id"]}`}>
                <div className="flex  flex-col">
                    <span className="w-32 font-semibold text-primaryLight-500 truncate underline">
                        {row.original["worker_code"]}
                    </span>
                </div>
            </Link>
        );
    },
},
  {
    accessorKey: "workerName",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Worker Name" withSort={false}/>;
    },
    cell: ({ row }) => {
      return (
        <div className="">
                    <span className="font-semibold ">{row.original["worker_name"]}</span>
                </div>
      );
    },
  },
  {
    accessorKey: "workerCompany",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Worker Company" withSort={false}/>;
    },
    cell: ({ row }) => {
      return (
        <div className="">
                    <span className="font-semibold ">{row.original["worker_company"]}</span>
                </div>
      );
    },
  },  {
    accessorKey: "workerAddress",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Worker Address" withSort={false}/>;
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
    accessorKey: "officePhone",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Office Phone" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">{row.original["worker_ofc_phone"]}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "createdOn",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Created On" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
        <span className=" ">{row.original["createdAt"]}</span>
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
          <Link href={`/workers/${row.original["id"]}`}><span className="hover:underline font-semibold text-primaryLight-500 flex items-center"><HiEye />Details </span></Link>
          <Link href={`/workers/${row.original["id"]}/edit`}><span className="hover:underline font-semibold text-primaryLight-500 flex items-center"><HiPencilAlt />Edit </span></Link>
        </div>
      );
    },
  },
];
