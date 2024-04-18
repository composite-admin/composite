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
  description: string;
  quantity: string;
  unitPrice: string;
  totalCost: string;
  dateAdded: string;
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Description" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <div>
            <p className="font-semibold underline text-primaryLight">
              Allison Ogaga
            </p>
            <p>CRNOWUWUWU</p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "supplier",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Supplier" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">Wale Bello</span>
        </div>
      );
    },
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Quantity" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">x100</span>
        </div>
      );
    },
  },

  {
    accessorKey: "unitPrice",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Unit Price" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">N200.0</span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalCost",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Total Price" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold">N100,000</span>
        </div>
      );
    },
  },
  {
    accessorKey: "dateAdded",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Date Added" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">N100,000</span>
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
          <span className="hover:underline font-semibold text-primaryLight-500 flex items-center">
            <HiPencilAlt />
            Edit{" "}
          </span>
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
          <p className="px-1 font-semibold w-fit  text-red-500">Delete</p>
        </div>
      );
    },
  },
];
