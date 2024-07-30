import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { ViewUserPageIcon } from "@/components/icons";
import Link from "next/link";
import EditCell, { ViewCell } from "../../facility/all-flats/EditCell";
import { IProjectTeamMember } from "@/utils/types";

export const columns: ColumnDef<IProjectTeamMember>[] = [
  {
    accessorKey: "staff_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Full Name" />;
    },
    cell: ({ row }) => {
      const { staff_name, staff_id } = row.original;
      return (
        <div className="">
          <div className="flex gap-2.5 items-center">
            <div className="flex flex-col">
              <span className="capitalize font-semibold">{staff_name}</span>
              <span className="uppercase font-semibold">{staff_id}</span>
            </div>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "project_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Project Name" />;
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Status" />;
    },
  },

  {
    accessorKey: "role",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Role" />;
    },
  },
];
