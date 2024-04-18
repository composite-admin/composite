"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useAddWorkerModal } from "@/store/inventory/UseInventoryModal";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiUserAdd } from "react-icons/hi";

export type ReportType = {
  id: string;
  role: string;
  name: string;
  status: string;
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Full Name" />;
    },
    cell: ({ row }) => {
      return (
        // <Link href={`/project/${row.original["id"]}`}>
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <div>
            <p className="font-semibold ">Allison Ogaga</p>
            <p>CRNOWUWUWU</p>
          </div>
        </div>
        // </Link>
      );
    },
  },

  {
    accessorKey: "role",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Role" withSort={false} />;
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
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Status" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <p className="bg-[#E7F6EC] px-1 text-[12px] w-fit rounded-full text-[#036B26]">
            Active
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Action" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="cursor-pointer">
          <p className="px-1 font-semibold w-fit  text-red-500">Remove</p>
        </div>
      );
    },
  },
];
