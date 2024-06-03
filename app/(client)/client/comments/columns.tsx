"use client";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { IClientProjectData } from "@/utils/types";
import { ICommentData } from "@/app/(admin)/manage-client/client-details/[id]/commentCol";

export const columns: ColumnDef<ICommentData>[] = [
  {
    accessorKey: "projectName",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Project Name" />;
    },
    cell: ({ row }) => {
      return (
        <div>
          <div className="flex flex-col text-textColor">
            <span className="w-32 text-textColortext-primaryLight-500 truncate underline">
              {row.original["project_name"]}
            </span>
            <span className="text-xs text-textColortext-gray-500 uppercase">
              {row.original["project_code"]}
            </span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "comment_title",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Comment Title" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="text-textColor">
            {row.original["comment_title"]}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Comment" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="text-textColor">{row.original["comment"]}</span>
        </div>
      );
    },
  },
];
