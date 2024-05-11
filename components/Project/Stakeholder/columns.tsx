"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useAddWorkerModal } from "@/store/inventory/UseInventoryModal";
import { IStakeholderProjectData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiPencilAlt, HiUserAdd } from "react-icons/hi";
import { formatCurrency } from "../../../utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

export const columns: ColumnDef<IStakeholderProjectData>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="ID" />;
    },
    cell: ({ row }) => {
      return <p className="text-textColor px-0 font-normal">1</p>;
    },
  },
  {
    accessorKey: "stakeholder_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Stakeholder Name" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col text-primaryLight gap-1 font-semibold">
          <p className="">{row.original["stakeholder_name"]}</p>
          <p className="text-textColor font-normal">
            {row.original["stakeholder_code"]}
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "approved_amount",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Amount" withSort={false} />;
    },
    cell: ({ row }) => {
      const { approved_amount } = row.original;
      return (
        <span className="font-semibold ">
          {formatCurrency(approved_amount)}
        </span>
      );
    },
  },

  {
    accessorKey: "created_by",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Added by" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <AvatarComponent />
          <span className="w-16">{row.original["created_by"]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Date Added" withSort={false} />
      );
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const formatted = formatDate(createdAt);
      return (
        <div className="">
          <p className="bg-[#E7F6EC] px-1 text-[12px] w-fit rounded-full text-[#036B26]">
            {formatted}
          </p>
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
          <span className="hover:underline font-semibold text-primaryLight-500 flex items-center">
            <HiPencilAlt />
            Edit{" "}
          </span>
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
