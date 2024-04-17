"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatDate } from "@/utils/formatDate";
import { IProjectReport } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<IProjectReport>[] = [
  {
    accessorKey: "reportTitle",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Report Title" />;
    },
    cell: ({ row }) => {
      const { project_name, project_code } = row.original;
      return (
        <div className="flex flex-col w-20 truncate">
          <span className="font-semibold text-primaryLight-500 ">
            {project_name}
          </span>
          <span>{project_code}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "submitted_on",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Submitted On" withSort={false} />
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
    accessorKey: "report_type",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Report Type" withSort={false} />
      );
    },
    cell: ({ row }) => {
      const { report_type } = row.original;
      return (
        <div className="">
          <span
            className={`rounded-full w-12 text-[0.8rem] text-center  font-semibold p-1 px-2 ${
              report_type == "Daily"
                ? "bg-[#E7F6EC] text-[#036B26]"
                : report_type == "Weekly"
                ? "bg-[#FEF6E7] text-[#865503]"
                : "bg-[#FFECE5] text-[#8A0000]"
            }`}
          >
            {report_type}
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
      const { name } = row.original;
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <span className="font-semibold">{name}</span>
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
          View
        </Link>
      );
    },
  },
];
