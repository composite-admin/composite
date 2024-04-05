"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { IRequestData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<IRequestData>[] = [
  {
    accessorKey: "sta",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Report Title" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex  flex-col">
          <span className="w-32 font-semibold text-primaryLight-500 truncate">
            {row.getValue("project_name")}
          </span>
          <span>{row.getValue("report_code")}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Submitted On" withSort={false} />
      );
    },
  },

  {
    accessorKey: "report_type",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Report Type" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="rounded-full w-12 text-[0.8rem] text-center bg-[#E7F6EC] text-[#036B26] font-semibold  p-1 px-2">
            {row.getValue("report_type")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "project_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Project" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">{row.getValue("project_name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Created By" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <span className="font-semibold">{row.getValue("createdBy")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_for",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Created For" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <span className="font-semibold">{row.getValue("created_for")}</span>
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
        <Link
          href={`/reports/${row.getValue("id")}`}
          className="text-primaryLight-500 underline flex gap-1.5 items-center font-medium"
        >
          <ViewUserPageIcon />
          View
        </Link>
      );
    },
  },
];
