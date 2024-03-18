"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiUserAdd } from "react-icons/hi";

export type ReportType = {
  id: string;
  projectName: string;
  startDate: string;
  endDate: string;
  status: string;
  totalWorker: string;
  worker: string;
  materials: string;
};

export const columns: ColumnDef<ReportType>[] = [
  {
    accessorKey: "projectName",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Project Name" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex  flex-col">
          <span className="w-32 font-semibold text-primaryLight-500 truncate">
            High Tower Cost Renovation
          </span>
          <span>RCPD119548</span>
        </div>
      );
    },
  },

  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Start Date" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">6 July, 2023</span>
        </div>
      );
    },
  },

  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="End Date" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">6 july, 2023</span>
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
          <p className='bg-[#E7F6EC] px-1 text-[12px] w-fit rounded-full text-[#036B26]'>Completed</p>
        </div>
      );
    },
  },
  {
    accessorKey: "totalWorker",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Total Worker" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold text-primaryLight-500 text-center">12</span>
        </div>
      );
    },
  },
  {
    accessorKey: "worker",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Worker" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold text-primaryLight-500 flex items-center"><HiUserAdd />Add </span>
        </div>
      );
    },
  },
  {
    accessorKey: "worker",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Worker" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold text-primaryLight-500 flex items-center"><HiOutlineCog />Add </span>
        </div>
      );
    },
  },
];
