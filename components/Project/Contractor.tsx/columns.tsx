"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useAddWorkerModal } from "@/store/inventory/UseInventoryModal";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteIcon } from "lucide-react";
import Link from "next/link";
import { HiOutlineCog, HiPencilAlt, HiUserAdd } from "react-icons/hi";

export type ReportType = {
  id: string;
  worker: string;
  serviceType: string;
  address: string;
  emailAddresses: string;
  contactPhone: string;
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "worker",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Worker" />;
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
    accessorKey: "serviceType",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Service Type" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">Cable TV Installation</span>
        </div>
      );
    },
  },

  {
    accessorKey: "address",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Address" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">Graceland Avenue Along Ikeja</span>
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
          <span className="font-semibold ">john@gmail.com</span>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="hover:underline font-semibold text-primaryLight-500 flex items-center"><HiPencilAlt />Edit </span>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div
          
          className="text-primaryLight-500 underline flex gap-1.5 items-center font-medium"
        >
          <DeleteIcon />
          Delete
        </div>
      );
    },
  },


];
