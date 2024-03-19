"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiUserAdd } from "react-icons/hi";

export type ReportType = {
  id: string;
  fiatCode: string;
  projectName: string;
  fiatDescription: string;
  dateAdded: string;
  status: string;
  actions: string;
};

export const columns: ColumnDef<ReportType>[] = [
  {
    accessorKey: "fiatCode",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Fiat Code" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
        <span className="font-semibold text-primaryLight-500 flex items-center">JHSDB7EIEWE</span>
      </div>
      );
    },
  },

  {
    accessorKey: "projectName",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Project Name" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Alison Ogaga</span>
        </div>
      );
    },
  },

  {
    accessorKey: "fiatDescription",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Fiat Description" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">Project Manager</span>
        </div>
      );
    },
  },
  {
    accessorKey: "dateAdded",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Date Added " withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">

          <p>6th July, 2002</p>
          <p>10am</p>
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
          <p className='bg-[#E7F6EC] px-1 text-[12px] w-fit rounded-full text-[#036B26]'>Active</p>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" />;
    },
    cell: ({ row }) => {
      return (
        <Link
          href={"/"}
          className="text-primaryLight-500 underline flex gap-1.5 items-center font-medium"
        >
          <ViewUserPageIcon />
          View
        </Link>
      );
    },
  }
];
