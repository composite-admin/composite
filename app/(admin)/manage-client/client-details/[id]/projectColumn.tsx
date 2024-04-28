import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { IClientData, IClientProjectData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/utils/formatDate";
import { ViewUserPageIcon } from "@/components/icons";
import Link from "next/link";

export const projectColumns: ColumnDef<IClientProjectData>[] = [
  {
    accessorKey: "project_name",

    header: ({ column }) => {
      return <ColumnHeader column={column} title="Project Name" />;
    },
    cell: ({ row }) => {
      const { project_code, project_name } = row.original;
      return (
        <div className="">
          <div className="flex flex-col">
            <span className="capitalize font-semibold">{project_name}</span>
            <p>{project_code}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "project_duration",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Email Address" />;
    },
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Contact Phone" />;
    },
    cell: ({ row }) => {
      const { start_date } = row.original;
      const formattedDate = formatDate(start_date);
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Date Added" />;
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const formattedDate = formatDate(createdAt);
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" withSort={false} />;
    },
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <Link
          href={`manage-client/client-details/${id}`}
          className="text-primaryLight-500 underline flex items-center font-medium"
        >
          View
        </Link>
      );
    },
  },
];
