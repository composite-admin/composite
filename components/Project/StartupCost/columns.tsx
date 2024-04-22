"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatCurrency } from "@/utils/formatCurrency";
import { IStartupCostProjectData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiPencilAlt } from "react-icons/hi";

export const columns: ColumnDef<IStartupCostProjectData>[] = [
  {
    accessorKey: "startup_desc",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Description" />;
    },
    cell: ({ row }) => {
      return (
        <p className="font-semibold capitalize">{row.original.startup_desc}</p>
      );
    },
  },

  {
    accessorKey: "startup_type",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Type" withSort={false} />;
    },
  },

  {
    accessorKey: "startup_cost",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Cost" withSort={false} />;
    },
    cell: ({ row }) => {
      const { startup_cost } = row.original;
      const formattedCost = formatCurrency(startup_cost);
      return (
        <div>
          <p>{formattedCost}</p>
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
      const date = new Date(row.original.createdAt);
      return (
        <div className="">
          <p className=" ">
            {date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
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
];
