"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";

export type ConsultantsType = {
  id: string;
  fullName: string;
  type: string;
  emailAddress: string;
  contactPhone: string;
  website: string;
  dateAdded: string;
  actions: string;
};

export const columns: ColumnDef<ConsultantsType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="ID" />;
    },
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Full Name" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <div className="flex-col flex">
            <span className="font-semibold">{row.getValue('fullName')}</span>
            <span className="text-xs">CRN128320182</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Type" />;
    },
  },
  {
    accessorKey: "emailAddress",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Email Address" />;
    },
  },
  {
    accessorKey: "contactPhone",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Contact Phone" />;
    },
  },
  {
    accessorKey: "website",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Website" withSort={false} />;
    },
  },
  {
    accessorKey: "dateAdded",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Date Added" withSort={false} />
      );
    },
  },
  {
    accessorKey: "actions",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <Link
          href={row.getValue("actions")}
          className="text-primaryLight-500 underline flex gap-1.5 items-center font-medium"
        >
          <ViewUserPageIcon />
          View
        </Link>
      );
    },
  },
];
