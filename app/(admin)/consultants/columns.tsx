"use client";

import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatDate } from "@/utils/formatDate";
import { IConsultantData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<IConsultantData>[] = [

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Full Name" withSort={false} />
      );
    },
    cell: ({ row }) => {
      const { consultant_code } = row.original;
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <div className="flex-col flex">
            <span className="font-semibold">{row.getValue("name")}</span>
            <span className="text-sm text-textColor font-semibold">
              {consultant_code}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Type" />;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Email Address" />;
    },
  },
  {
    accessorKey: "contact",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Contact Phone" />;
    },
  },
  {
    accessorKey: "website",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Website" withSort={false} />;
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
      const date = formatDate(createdAt);
      return <span>{date && date}</span>;
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" withSort={false} />;
    },
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <Link
          href={`consultants/consultant/${id}`}
          className="text-primaryLight-500 underline flex gap-1.5 items-center font-medium"
        >
          View
        </Link>
      );
    },
  },
];
