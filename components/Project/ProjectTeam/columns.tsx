"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useAddWorkerModal } from "@/store/inventory/UseInventoryModal";
import { IProjectTeamMemberByProjectData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiUserAdd } from "react-icons/hi";

export const columns: ColumnDef<IProjectTeamMemberByProjectData>[] = [
  {
    accessorKey: "staff_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Full Name" />;
    },
    cell: ({ row }) => {
      return (
        // <Link href={`/project/${row.original["id"]}`}>
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <div>
            <p className="font-semibold ">{row.original["staff_name"]}</p>
            <p className="uppercase font-semibold">
              {row.original["project_code"]}
            </p>
          </div>
        </div>
        // </Link>
      );
    },
  },

  {
    accessorKey: "role",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Role" withSort={false} />;
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Status" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <p className="font-semibold">{row.original["status"]}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Action" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="cursor-pointer">
          <p className="px-1 font-semibold w-fit  text-red-500">Remove</p>
        </div>
      );
    },
  },
];
