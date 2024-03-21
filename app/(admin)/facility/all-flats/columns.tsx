"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";

import EditCell from "./EditCell";

export type AllFlatsType = {
  flatCode: string;
  projectName: string;
  flatDescription: string;
  dateAdded: string;
  status: "occupied" | "vacant";
  actions: string;
};

export const columns: ColumnDef<AllFlatsType>[] = [
  {
    accessorKey: "flatCode",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Flat Code" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <div className="flex-col flex">
            <span className="font-semibold">{row.getValue("flatCode")}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "projectName",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Project Name" />;
    },
  },
  {
    accessorKey: "flatDescription",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Flat Description" />;
    },
  },
  {
    accessorKey: "dateAdded",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Date Added" />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Website" withSort={false} />;
    },

    cell: ({ row }) => {
      let currentStatus = String(row.getValue("status"));

      return (
        <div className="flex gap-2 items-center">
          <span
            className={`capitalize p-2 w-max font-semibold rounded-3xl text-xs ${
              currentStatus === "occupied"
                ? "text-green-500 bg-[#E7F6EC]"
                : "text-[#865503] bg-[#FEF6E7]"
            }`}
          >
            {currentStatus}
          </span>
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
      let href = String(row.getValue("actions"));
      return (
        <>
          <EditCell href={href} />
        </>
      );
    },
  },
];