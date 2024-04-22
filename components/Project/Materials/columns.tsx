"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useAddWorkerModal } from "@/store/inventory/UseInventoryModal";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { IMaterialsByProjectData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteIcon } from "lucide-react";
import Link from "next/link";
import { HiOutlineCog, HiPencilAlt, HiUserAdd } from "react-icons/hi";

export const columns: ColumnDef<IMaterialsByProjectData>[] = [
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
              {row.original["description"]}
            </p>
            <p>{row.original["material_code"]}</p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "supplier_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Supplier" withSort={false} />;
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
          <span className="font-semibold">x{row.original["quantity"]}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "unit_price",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Unit Price" withSort={false} />
      );
    },
    cell: ({ row }) => {
      const { unit_price } = row.original;
      return (
        <div className="">
          <span className="font-semibold">{formatCurrency(unit_price)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "total_price",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Total Price" withSort={false} />
      );
    },
    cell: ({ row }) => {
      const { total_price } = row.original;
      return (
        <div className="">
          <span className="font-semibold">{formatCurrency(total_price)}</span>
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
      const { createdAt } = row.original;
      const formatted = formatDate(createdAt);
      return (
        <div className="">
          <span className="font-semibold ">{formatted}</span>
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
