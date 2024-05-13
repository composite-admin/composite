"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useAddWorkerModal } from "@/store/inventory/UseInventoryModal";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiUserAdd } from "react-icons/hi";
import { RiToolsFill } from "react-icons/ri";
import { IClientProject } from "./data";
import { IClientProjectData } from "@/utils/types";

export const columns: ColumnDef<IClientProjectData>[] = [
  {
    accessorKey: "projectName",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Project Name" />;
    },
    cell: ({ row }) => {
      return (
        <Link href={`project/project-details/${row.original["project_id"]}`}>
          <div className="flex  flex-col">
            <span className="w-32 font-semibold text-primaryLight-500 truncate underline">
              {row.original["project_name"]}
            </span>
            <span className="text-xs font-semibold text-gray-500">
              {row.original["project_code"]}
            </span>
          </div>
        </Link>
      );
    },
  },

  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Start Date" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">
            {formatDate(row.original["createdAt"])}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="End Date" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">
            {formatDate(row.original["updatedAt"])}
          </span>
        </div>
      );
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
          <p className="bg-[#E7F6EC] px-1 text-[12px] w-fit rounded-full text-[#036B26]">
            {row.original["status"]}
          </p>
        </div>
      );
    },
  },
];
