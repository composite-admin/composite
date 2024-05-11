"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate, formatDateToString } from "@/utils/formatDate";
import { IStakeholderProjectData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import {
  HiEye,
  HiOutlineCog,
  HiOutlineDocumentRemove,
  HiPencilAlt,
  HiUserAdd,
} from "react-icons/hi";

export const columns: ColumnDef<IStakeholderProjectData>[] = [
  {
    accessorKey: "stakeholder_project_code",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Project Code" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap.5">
          <span className="font-semibold uppercase text-primaryLight underline">
            {row.original["project_name"] ?? "N/A"}
          </span>
          <span className="font-semibold uppercase">
            {row.original["stakeholder_project_code"] ?? "N/A"}
          </span>
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
      const formatted = formatCurrency(approved_amount);
      return (
        <div className="">
          <span className="font-semibold ">{formatted}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Created on" withSort={false} />
      );
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const formatted = formatDateToString(createdAt);
      return (
        <div className="">
          <span className="font-semibold ">{formatted}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_by",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Created by" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className=" ">{row.original["stakeholder_name"]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "comment",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Comment" withSort={false} />;
    },
  },

  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Action" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <Link href="#">
            <span className="hover:underline font-semibold text-primaryLight-500 flex items-center">
              View{" "}
            </span>
          </Link>
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Action" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <Link href="#">
            <span className="hover:underline font-semibold text-primaryLight-500 flex items-center">
              <HiPencilAlt />
              Edit{" "}
            </span>
          </Link>
        </div>
      );
    },
  },
];
    