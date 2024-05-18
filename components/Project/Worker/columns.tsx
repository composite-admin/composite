"use client";

import EditCell from "@/app/(admin)/facility/all-flats/EditCell";
import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useAddWorkerModal } from "@/store/inventory/UseInventoryModal";
import { IWorkerByProjectData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<IWorkerByProjectData>[] = [
  {
    accessorKey: "worker_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Worker" />;
    },
    cell: ({ row }) => {
      const { worker_name, worker_code } = row.original;
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <div>
            <p className="font-semibold">{worker_name}</p>
            <p className="text-textColor">{worker_code}</p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "service_type",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Service Type" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <p className="font-semibold w-24 text-wrap">
            {row.original.service_type}
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "worker_email",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Email Address" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return <p className="w-24 text-wrap">{row.original.worker_email}</p>;
    },
  },
  {
    accessorKey: "worker_home_phone",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Home Phone" withSort={false} />
      );
    },
  },
  {
    accessorKey: "worker_ofc_phone",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Office Phone" withSort={false} />
      );
    },
  },

  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Delete" withSort={false} />;
    },
    cell: ({ row }) => {
      return <span className="font-semibold text-red-500">Delete</span>;
    },
  },
];


