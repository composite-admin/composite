"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiUserAdd } from "react-icons/hi";
import { IProjectFlatData } from "./page";

export const columns: ColumnDef<IProjectFlatData>[] = [
  {
    accessorKey: "fiatCode",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Fiat Code" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold text-primaryLight-500 flex items-center">
            JHSDB7EIEWE
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "projectName",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Project Name" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Alison Ogaga</span>
        </div>
      );
    },
  },

  {
    accessorKey: "fiatDescription",
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
          <span className="font-semibold ">Project Manager</span>
        </div>
      );
    },
  },

  {
    accessorKey: "flat_id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" />;
    },
    cell: ({ row }) => {
      return (
        <Link
          href={"/"}
          className="text-primaryLight-500 underline flex gap-1.5 items-center font-medium"
        >
          <ViewUserPageIcon />
          View
        </Link>
      );
    },
  },
];
