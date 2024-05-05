"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { IRequestData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
// {
//     "id": 2,
//     "request_code": "req-58284",
//     "user_id": "usr-0001",
//     "comment": "This is not a comment about the request.",
//     "createdAt": "2024-05-02T23:40:50.326Z",
//     "updatedAt": "2024-05-02T23:40:50.326Z",
//     "added_by": "John Smith"
// },

export interface IRequestCommentData {
  id: number;
  request_code: string;
  user_id: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  added_by: string;
}

export const columns: ColumnDef<IRequestCommentData>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Created At" />;
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      return <span className="w-44 truncate">{formatDate(createdAt)}</span>;
    },
  },
  {
    accessorKey: "added_by",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Added by" />;
    },
    cell: ({ row }) => {
      const { added_by } = row.original;
      return (
        <div className="flex gap-1 items-center">
          <AvatarComponent />
          <p>{added_by}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "comment",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Comment" withSort={false} />;
    },
  },
];
