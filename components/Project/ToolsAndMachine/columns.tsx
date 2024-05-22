"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useAddWorkerModal } from "@/store/inventory/UseInventoryModal";
import { ColumnDef } from "@tanstack/react-table";
import { DeleteIcon } from "lucide-react";
import Link from "next/link";
import { HiOutlineCog, HiPencilAlt, HiUserAdd } from "react-icons/hi";
import { IRequestData } from "../../../utils/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

export const columns: ColumnDef<IRequestData>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Description" />;
    },
    cell: ({ row }) => {
      return (
        // <Link href={`/project/${row.original["id"]}`}>
        <div className="flex gap-2 items-center uppercase">
          <div>
            <p className="font-semibold ">{row.original["description"]}</p>
            <p>{row.original["request_code"]}</p>
          </div>
        </div>
        // </Link>
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
          <span className="font-semibold ">{row.original["approved_quantity"]}</span>
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
      return (
        <div className="">
          <span className="font-semibold ">
            {formatCurrency(row.original["approved_unit_price"])}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "total_price",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Total Cost" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">
            {formatCurrency(row.original["approved_total_amount"])}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Date Added" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">
            {formatDate(row.original["createdAt"])}
          </span>
        </div>
      );
    },
  },
];
