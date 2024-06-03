import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { IClientData, IClientProjectData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

export interface ICommentData {
  comment_id: number;
  client_id: number | null;
  project_code: string | null;
  comment_code: string | null;
  sender_name: string | null;
  comment_title: string | null;
  comment: string;
  project_name: string;
  status: string | null;
  createdAt: string;
  updatedAt: string;
}

export const commentColumns: ColumnDef<ICommentData>[] = [
  {
    accessorKey: "project_name",

    header: ({ column }) => {
      return <ColumnHeader column={column} title="Comment" />;
    },
    cell: ({ row }) => {
      const { comment_title, comment } = row.original;
      return (
        <div className="">
          <div className="flex flex-col capitalize">
            <span className=" font-semibold">{comment_title}</span>
            <p>{comment}</p>
          </div>
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
      const { project_code } = row.original;
      return <span className="uppercase">{project_code} </span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Start Date" />;
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const formattedDate = formatDate(createdAt);
      return <span>{formattedDate}</span>;
    },
  },
];
