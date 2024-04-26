"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useProjectData } from "@/hooks/useSelectOptions";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate, formatDateToString } from "@/utils/formatDate";
import { IContractorProjectData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import {
  HiEye,
  HiOutlineCog,
  HiOutlineDocumentRemove,
  HiPencilAlt,
  HiUserAdd,
} from "react-icons/hi";

export const columns: ColumnDef<IContractorProjectData>[] = [
  {
    accessorKey: "contractor_project_code",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Contractor Code"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold uppercase">
            {row.original["contractor_project_code"]}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "approved_amount",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Project Code" withSort={false} />
      );
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
      return <ColumnHeader column={column} title="Amount" withSort={false} />;
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
      return <ColumnHeader column={column} title="Created On" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className=" ">{formatDate(row.original["createdAt"])}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "comment",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Created By" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">{row.original["comment"]}</span>
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
