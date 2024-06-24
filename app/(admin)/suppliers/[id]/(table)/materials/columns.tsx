"use client";

import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { Material } from "@/store/actions/materials-and-tools/types";
import { formatToNaira } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import EditPartMaterial from "./edit-part";

export const materialsColumns: ColumnDef<Material>[] = [
  {
    accessorKey: "mat_desc",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Description" />;
    },
    cell: ({ row }) => {
      const { mat_desc, supplier_code } = row.original;

      return (
        <div className="flex gap-2 items-center">
          <div className="space-y-1">
            <span className="font-semibold capitalize border-b text-primaryLight border-primaryLight/70">
              {mat_desc}
            </span>
            <p className="uppercase">{row.original["mat_code"]}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Quantity" />;
    },
    cell: ({ row }) => {
      const { quantity } = row.original;

      return (
        <div className="">
          <span className="font-semibold ">{`x${quantity}`}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "unit_price",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Unit Price" />;
    },
    cell: ({ row }) => {
      const { unit_price } = row.original;

      return (
        <div className="">
          <span className="font-semibold ">{formatToNaira(unit_price)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "total_price",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Total Cost" />;
    },
    cell: ({ row }) => {
      const { unit_price, quantity } = row.original;

      return (
        <p className="font-semibold">{formatToNaira(unit_price * quantity)}</p>
      );
    },
  },
  {
    accessorKey: "mat_desc",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Comment" withSort={false} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Date Added" />;
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;

      return (
        <div>
          <p>{formatDate(createdAt as string)}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "mat_id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Action" />;
    },
    cell: ({ row }) => {
      return (
        <div>
          <EditPartMaterial {...row} />
        </div>
      );
    },
  },
];
