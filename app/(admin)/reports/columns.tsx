"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type ReportType = {
  id: string;
  reportTitle: string;
  submittedOn: string;
  reportType: string;
  project: string;
  createdBy: string;
  createdFor: string;
  actions: string;
};

export const columns: ColumnDef<ReportType>[] = [
  {
    accessorKey: "reportTitle",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Report Title" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex  flex-col">
          <span className="w-32 font-semibold text-primaryLight-500 truncate">
            Bode Project builder
          </span>
          <span>RCPD119548</span>
        </div>
      );
    },
  },

  {
    accessorKey: "submittedOn",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Submitted On" withSort={false} />
      );
    },
  },

  {
    accessorKey: "reportType",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Report Type" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="rounded-full w-12 text-[0.8rem] text-center bg-[#E7F6EC] text-[#036B26] font-semibold  p-1 px-2">
            Daily
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "project",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Project" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">Bode Peters</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Created By" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <span className="font-semibold">Alison Ogaga</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdFor",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Created For" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <span className="font-semibold">Alison Ogaga</span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <Link
          href={row.getValue("actions")}
          className="text-primaryLight-500 underline flex gap-1.5 items-center font-medium"
        >
          <ViewUserPageIcon />
          View
        </Link>
      );
    },
  },
];
