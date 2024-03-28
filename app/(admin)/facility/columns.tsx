"use client";

import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import EditCell, { ViewCell } from "./all-flats/EditCell";

export interface IFacilityTableColumns {
  tenantCode: string;
  title: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  dateAdded: string;
  status: "active" | "inactive";
  editAction: string;
  viewAction: string;
}

export const columns: ColumnDef<IFacilityTableColumns>[] = [
  {
    accessorKey: "tenantCode",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title={"Tenant Code"} withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-semibold text-primaryLight-500 underline w-24 truncate">
          {row.getValue("tenantCode")}
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
      return <div>{row.getValue("title")}</div>;
    },
  },
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title={"Full Name"} withSort={false} />
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("fullName")}</div>;
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title={"Phone Number"} withSort={false} />
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("phoneNumber")}</div>;
    },
  },
  {
    accessorKey: "emailAddress",
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
      return <div>{row.getValue("emailAddress")}</div>;
    },
  },
  {
    accessorKey: "dateAdded",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title={"Date Added"} withSort={false} />
      );
    },
    cell: ({ row }) => {
      return <div>{row.getValue("dateAdded")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnHeader column={column} title={"Status"} withSort={false} />;
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as IFacilityTableColumns["status"];
      return (
        <div className="flex gap-2 items-center">
          <span
            className={`capitalize p-2 w-max font-semibold rounded-3xl text-xs ${
              status === "active"
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
    accessorKey: "editAction",
    header: ({ column }) => {
      return <ColumnHeader column={column} title={"Edit"} withSort={false} />;
    },
    cell: ({ row }) => {
      let href = String(row.getValue("editAction"));
      return (
        <>
          <EditCell href={`facility/edit-tenant/${href}`} />
        </>
      );
    },
  },
  {
    accessorKey: "viewAction",
    header: ({ column }) => {
      return <ColumnHeader column={column} title={"View"} withSort={false} />;
    },
    cell: ({ row }) => {
      let href = String(row.getValue("viewAction"));
      return (
        <>
          <ViewCell href={`facility/tenant/${href}`} />
        </>
      );
    },
  },
];
