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
          <div className="flex flex-col uppercase">
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
      return <ColumnHeader column={column} title="Duration" />;
    },
    cell: ({ row }) => {
      const { project_duration } = row.original;
      return <span>{project_duration} Days</span>;
    },
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Start Date" />;
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
];
