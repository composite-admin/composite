"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ITenantData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiPencilAlt, HiUserAdd } from "react-icons/hi";

export type ReportType = {
  id: string;
  tenantCode: string;
  title: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  dateAdded: string;
  status: string;
  actions: string;
  actions1: string;
};

export const columns: ColumnDef<ITenantData>[] = [
  {
    accessorKey: "tenant_code",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Tenant Code" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold text-primaryLight-500 flex items-center uppercase">
            {row.original["tenant_code"]}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "title",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Title" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <span className="font-semibold">{row.original["title"]}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Full Name" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">{row.original["full_name"]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "phone_number",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Phone Number " withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <span className="font-semibold ">{row.original["phone_number"]}</span>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Email Address " withSort={false} />
      );
    },
    cell: ({ row }) => {
      return <span className="font-semibold ">{row.original["email"]}</span>;
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
    accessorKey: "tenant_id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" />;
    },
    cell: ({ row }) => {
      return (
        <Link
          href={"/"}
          className="text-primaryLight-500 underline flex gap-1.5 items-center font-medium"
        >
          <HiPencilAlt />
          Edit
        </Link>
      );
    },
  },
  {
    accessorKey: "tenant_id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" />;
    },
    cell: ({ row }) => {
      return (
        <Link
          href={`/facility/tenant/${row.original["tenant_id"]}`}
          className="text-primaryLight-500 underline flex gap-1.5 items-center font-medium"
        >
          <ViewUserPageIcon />
          View
        </Link>
      );
    },
  },
];
