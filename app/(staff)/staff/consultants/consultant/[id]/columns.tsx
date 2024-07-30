"use client";

import EditCell from "@/app/(admin)/facility/all-flats/EditCell";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatDate } from "@/utils/formatDate";
import { IConsultantProjectData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<IConsultantProjectData>[] = [
  {
    accessorKey: "project_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Project Name" />;
    },
    cell: ({ row }) => {
      const { project_name } = row.original;
      return (
        <div className="flex gap-2 items-center">
          <span className="font-semibold  text-primaryLight underline">
            {project_name}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "project_code",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Project Code" />;
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm text-textColor font-semibold uppercase">
          {row.original.project_code}
        </span>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Start Date" withSort={false} />
      );
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const date = formatDate(createdAt);
      return <span>{date && date}</span>;
    },
  },
];
