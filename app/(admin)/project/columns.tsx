"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useAddWorkerModal } from "@/store/inventory/UseInventoryModal";
import { formatDate } from "@/utils/formatDate";
import { IProjectData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiUserAdd } from "react-icons/hi";
import { RiToolsFill } from "react-icons/ri";


export const columns: ColumnDef<IProjectData>[] = [
  {
    accessorKey: "project_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Project Name" />;
    },
    cell: ({ row }) => {
      return (
        <Link href={`/project/${row.original["id"]}`}>
          <div className="flex  flex-col">
            <span className="w-32 font-semibold text-primaryLight-500 truncate underline">
              {row.original["project_name"]}
            </span>
            <span className="font-semibold text-gray-500 uppercase">
              {row.original["project_code"]}
            </span>
          </div>
        </Link>
      );
    },
  },

  {
    accessorKey: "start_date",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Start Date" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">
            {formatDate(row.original["start_date"])}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="End Date" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">
            {formatDate(row.original["end_date"])}
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

  {
    accessorKey: "worker",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Worker" withSort={false} />;
    },
    cell: ({ row }) => {
      // const onOpen = useAddWorkerModal(state => state.onOpen);
      return (
        <Link href={`/project/add-worker?name=${row.original["project_name"]}`}>
          <div className="cursor-pointer">
            <span className="font-semibold text-primaryLight-500 flex items-center hover:underline">
              <HiUserAdd />
              Add{" "}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Materials" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <Link href={`/project/${row.original["id"]}/add-material`}>
          <div className="cursor-pointer">
            <span className="font-semibold text-primaryLight-500 flex items-center hover:underline">
              <RiToolsFill />
              Add{" "}
            </span>
          </div>
        </Link>
      );
    },
  },
];
