"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
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

export const columns: ColumnDef<ReportType>[] = [
  {
    accessorKey: "tenantCode",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Tenant Code" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
        <span className="font-semibold text-primaryLight-500 flex items-center">JHSDB7EIEWE</span>
      </div>
      );
    },
  },

  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Title" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <span className="font-semibold">Mr</span>
        </div>
      );
    },
  },

  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Full Name" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">Alonge Ogaga</span>
        </div>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Phone Number " withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <span className="font-semibold ">0902232233</span>
      );
    },
  },
  {
    accessorKey: "emailAddress",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Email Address " withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <span className="font-semibold ">joan@mail.com</span>
      );
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Phone Number " withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <span className="font-semibold ">6 july, 2003</span>
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
          <p className='bg-[#E7F6EC] px-1 text-[12px] w-fit rounded-full text-[#036B26]'>Active</p>
        </div>
      );
    },
  },
  {
    accessorKey: "actions1",
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
    accessorKey: "actions1",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" />;
    },
    cell: ({ row }) => {
      return (
        <Link
          href={"/"}
          className="text-primaryLight-500 underline flex gap-1.5 items-center font-medium"
        >
          <ViewUserPageIcon />
          View
        </Link>
      );
    },
  }

];
