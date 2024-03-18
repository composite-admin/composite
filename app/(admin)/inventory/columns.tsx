"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type ReportType = {
  id: string;
  description: string;
  totalQuantity: string;
  quantityLeft: string;
  inventoryCode: string;
  type: string;
  addedBy: string;
  addedOn: string;
  actions: string;
};

export const columns: ColumnDef<ReportType>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Description" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">Wheel Barrow</span>
        </div>
      );
    },
  },

  {
    accessorKey: "totalQuantity",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Total Quantity" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">x12</span>
        </div>
      );
    },
  },

  {
    accessorKey: "quantityLeft",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Quantity Left" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">x1</span>
        </div>
      );
    },
  },
  {
    accessorKey: "inventoryCode",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Inventory Code" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">IVHTV66JJ</span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Type" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">

          <span className="font-semibold">Tools</span>
        </div>
      );
    },
  },
  {
    accessorKey: "addedBy",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Added By" />;
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
