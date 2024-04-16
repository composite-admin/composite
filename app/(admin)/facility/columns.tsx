"use client";

import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import EditCell, { ViewCell } from "./all-flats/EditCell";
import { ITenantData } from "@/utils/types";
import { formatDate } from "../../../utils/formatDate";

export const columns: ColumnDef<ITenantData>[] = [
  {
    accessorKey: "tenant_code",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title={"Tenant Code"} withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-semibold uppercase text-primaryLight-500 underline w-24 truncate">
          {row.getValue("tenant_code")}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <ColumnHeader column={column} title={"Title"} withSort={false} />;
    },
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("title")}</div>;
    },
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title={"Full Name"} withSort={false} />
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("full_name")}</div>;
    },
  },
  {
    accessorKey: "phone_number",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title={"Phone Number"} withSort={false} />
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("phone_number")}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title={"Email Address"}
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title={"Date Added"} withSort={false} />
      );
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const formattedDate = formatDate(createdAt);
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnHeader column={column} title={"Status"} withSort={false} />;
    },
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <div className="flex gap-2 items-center">
          <span
            className={`capitalize p-2 w-max font-semibold rounded-3xl text-xs ${
              status === "Active"
                ? "text-green-500 bg-[#E7F6EC]"
                : "text-[#865503] bg-[#FEF6E7]"
            }`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "tenant_id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title={"Edit"} withSort={false} />;
    },
    cell: ({ row }) => {
      let { tenant_id } = row.original;
      let href = tenant_id;
      return (
        <>
          <EditCell href={`facility/edit-tenant/${href}`} isLink />
        </>
      );
    },
  },
  {
    accessorKey: "tenant_id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title={"View"} withSort={false} />;
    },
    cell: ({ row }) => {
      let { tenant_id } = row.original;
      return (
        <>
          <ViewCell href={`facility/tenant/${tenant_id}`} isLink={true} />
        </>
      );
    },
  },
];
