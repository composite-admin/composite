"use client";

import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";

export interface IRequestCommentData {
  id: number;
  request_code: string;
  user_id: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  added_by: string;
}

export const RequestColumns: ColumnDef<IRequestCommentData>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Created On" />;
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
