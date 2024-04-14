"use client";

import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { Material } from "@/store/actions/materials/types";
import { formatToNaira } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

export const materialsColumns: ColumnDef<Material>[] = [
  {
    accessorKey: "mat_desc",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Description" />;
    },
    cell: ({ row }) => {
      const { mat_desc } = row.original;

      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <div>
            <span className="font-semibold">{mat_desc}</span>
            <p>IVGSH776f</p>
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
      const { total_price } = row.original;

      return <p className="font-semibold">{formatToNaira(total_price)}</p>;
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
    accessorKey: "action",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Action" withSort={false} />;
    },
    cell: ({ row }) => {
      const {} = row.original;

      return (
        <Link href={"/suppliers/12/edit"}>
          <div className="">
            <span className="font-semibold cursor-pointer hover:underline text-primaryLight-500 flex items-center">
              <HiPencilAlt className="text-xl" /> <span>Edit</span>
            </span>
          </div>
        </Link>
      );
    },
  },
];
