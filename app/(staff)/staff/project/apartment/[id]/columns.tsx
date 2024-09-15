"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiUserAdd } from "react-icons/hi";
import { IProjectFlatData } from "./page";
import { formatDate } from "@/utils/formatDate";

export const columns: ColumnDef<IProjectFlatData>[] = [
  {
    accessorKey: "flat_code",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Fiat Code"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold text-primaryLight-500 flex items-cente uppercase">
            {row.original["flat_code"]}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "flat_desc",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Fiat Description"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold "> {row.original["flat_desc"]}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "flat_id",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Comment"
        />
      );
    },
    cell: ({ row }) => {
      return <div className="font-bold">{row.original.comment ?? "-"}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Updated at"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-bold">
          {formatDate(row.original.updatedAt as string) ?? "-"}
        </div>
      );
    },
  },
];
