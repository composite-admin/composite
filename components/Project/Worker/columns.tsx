"use client";

import EditCell from "@/app/(admin)/facility/all-flats/EditCell";
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
    accessorKey: "worker",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Worker" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <div>
            <p className="font-semibold">Allison Ogaga</p>
            <p className="text-textColor">CRN128320182</p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "service_type",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Service Type" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <p className="font-semibold w-24 text-wrap">Cable TV Installation</p>
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Email Address" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return <p className="w-24 text-wrap">jarus@gmail. com</p>;
    },
  },
  {
    accessorKey: "home_phone",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Home Phone" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return <p>+1 234 567 890</p>;
    },
  },
  {
    accessorKey: "Office Phone",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Office Phone" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return <p>+1 234 567 890</p>;
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Email Address" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return <EditCell />;
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Email Address" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return <span className="font-semibold text-red-500">Delete</span>;
    },
  },
];


