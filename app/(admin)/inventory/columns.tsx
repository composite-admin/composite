
"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useInventoryDetails } from "@/store/inventory/UseInventoryModal";
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
    accessorKey: "desciption",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Description" />;
    },
    cell: ({ row }) => {
      // const onOpen = useInventoryDetails((state) => state.onOpen);
      return (
        <div className="flex  flex-col cursor-pointer">
          <span className="w-32 font-semibold  truncate ">
            Wheel Barrow
          </span>
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
          <span className="font-semibold ">x2</span>
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
          <span className="font-semibold">IVNH23OII</span>
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
            <p>Tools</p>
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
          <p>6 july, 2023</p>
          <p>1:00PM</p>
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
        <div className="">
          <p className="text-primaryLight underline">View</p>
        </div>
      );
    },
  },
];
