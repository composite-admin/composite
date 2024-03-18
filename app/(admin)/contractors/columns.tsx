"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiPencilAlt, HiUserAdd } from "react-icons/hi";

export type ReportType = {
  id: string;
  contractorName: string;
  address: string;
  officePhone: string;
  contactPerson: string;
  contactPhone: string;
  addedOn: string;
  actions: string;
};

export const columns: ColumnDef<ReportType>[] = [
  {
    accessorKey: "contractorName",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Contractor Name" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <div>
            <span className="font-semibold">Alison Ogaga</span>
            <p>IVGSH776f</p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Address" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">Grace Land Avenue, Lagos</span>
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
          <span className="font-semibold ">0810933290</span>
        </div>
      );
    },
  },
  {
    accessorKey: "contactPerson",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Contact Person" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <span className="font-semibold">Alison Ogaga</span>
        </div>
      );
    },
  },
  {
    accessorKey: "contactPhone",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Contact Phone" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold text-primaryLight-500 text-center">0810933290</span>
        </div>
      );
    },
  },
  {
    accessorKey: "addedOn",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Added On" />;
    },
    cell: ({ row }) => {
      return (
        <div>
          <p>6th July, 2002</p>
          <p>10am</p>
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
          <span className="font-semibold text-primaryLight-500 flex items-center"><HiPencilAlt />Edit </span>
        </div>
      );
    },
  },
];
