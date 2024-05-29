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
import { DeleteCell } from "@/app/(admin)/facility/all-flats/EditCell";

export const columns: ColumnDef<IStakeholderProjectData>[] = [
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
    accessorKey: "stakeholder_amount",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Requested Amount"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      const { stakeholder_amount } = row.original;
      return (
        <span className="font-semibold ">
          {formatCurrency(stakeholder_amount)}
        </span>
      );
    },
  },

  {
    accessorKey: "approved_amount",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Approved Amount"
          withSort={false}
        />
      );
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
    accessorKey: "other_amount",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Other Amount" withSort={false} />
      );
    },
    cell: ({ row }) => {
      const { other_amount } = row.original;
      return (
        <span className="font-semibold ">{formatCurrency(other_amount)}</span>
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
    accessorKey: "comment",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Comment" withSort={false} />;
    },
    cell: ({ row }) => {
      return <p className="capitalize">{row.original.comment}</p>;
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
          <p className="">{formatted}</p>
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
        <DeleteCell
          row={row}
          rowId={row.original.id}
          url="stakeholder-project"
        />
      );
    },
  },
];
