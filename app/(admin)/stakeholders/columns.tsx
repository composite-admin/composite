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

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "stakeHolder",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="StakeHolder" />;
    },
    cell: ({ row }) => {
      return (
        <Link href={`/stakeholders/${row.original["id"]}`}>
          <div className="flex gap-2 items-center">
            <AvatarComponent />
            <div className="flex flex-col">
              <span className="w-32 font-semibold text-primaryLight-500 truncate underline">
                {row.original["stakeholder_name"]}
              </span>
              <span className="uppercase font-semibold text-gray-500">
                {row.original["stakeholder_code"]}
              </span>
            </div>
          </div>
        </Link>
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
          <span className="font-semibold ">
            {row.original["stakeholder_address"]}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "contactPerson",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Contact Person" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <span className="font-semibold">
            {row.original["contact_person"]}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "contactPhone",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Stakeholder Phone" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold text-primaryLight-500 text-center">
            {row.original["stakeholder_ofc_phone"]}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Added On" />;
    },
    cell: ({ row }) => {
      return (
        <div>
          <p>{formatDate(row.original["createdAt"])}</p>
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
          <Link href={`/stakeholders/${row.original["id"]}/edit`}>
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
