"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useInventoryDetails } from "@/store/inventory/UseInventoryModal";
import { formatDate } from "@/utils/formatDate";
import { IRequestData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<IRequestData>[] = [
  {
    accessorKey: "requestType",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Request Type" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex  flex-col cursor-pointer">
          <span className="w-32 font-semibold text-primaryLight-500 truncate underline">
            {row.original["request_type"]}
          </span>
          <span className="uppercase"> {row.original["request_code"]}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "toolName",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Tool Name" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">
            {" "}
            {row.original["tool_machinery_type"] ?? "N/A"}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Quantity" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">
            {row.original["approved_quantity"]}
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
          <span className="font-semibold ">{row.original["project_name"]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "pickedOn",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Picked On" />;
    },
    cell: ({ row }) => {
      const { updatedAt } = row.original;
      const formatted = formatDate(updatedAt);
      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "pickedBy",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Picked By" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <span className="font-semibold">
            {row.original["staff_name"] ?? "N/A"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      return (
        <p className="bg-[#E7F6EC] px-1 text-[12px] w-fit rounded-full text-[#036B26]">
          {row.original["status"]}
        </p>
      );
    },
  },
  {
    accessorKey: "returnedOn",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Returned On" withSort={false} />
      );
    },
    cell: ({ row }) => {
      const { updatedAt } = row.original;
      const formatted = formatDate(updatedAt);
      return <div className="">{formatted}</div>;
    },
  },
];
