"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useAddWorkerModal } from "@/store/inventory/UseInventoryModal";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { IConsultantProjectData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiPencilAlt, HiUserAdd } from "react-icons/hi";

export const columns: ColumnDef<IConsultantProjectData>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Consultant" />;
    },
    cell: ({ row }) => {
      const { name, id } = row.original;
      return (
        <div className="flex flex-col text-primaryLight gap-1 font-semibold">
          <Link
            href={`/consultants/consultant/${id}`}
            className="block cursor-pointer"
          >
            {name}
          </Link>
        </div>
      );
    },
  },

  {
    accessorKey: "consultant_id",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Consultant Code"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <span className="font-semibold uppercase">
          {row.original.consultant_id}
        </span>
      );
    },
  },

  {
    accessorKey: "service",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Type" withSort={false} />;
    },
    cell: ({ row }) => {
      const { type } = row.original;
      return (
        <div className="">
          <p className="">{type}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="hover:underline text-red-500 font-semibold">
            Delete
          </span>
        </div>
      );
    },
  },
];
