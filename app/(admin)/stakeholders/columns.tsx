"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiPencilAlt, HiUserAdd } from "react-icons/hi";

export type ReportType = {
  id: string;
  stakeHolderName: string;
  address: string;
  officePhone: string;
  contactPerson: string;
  contactPhone: string;
  addedOn: string;
  actions: string;
};

export const columns: ColumnDef<ReportType>[] = [
  {
    accessorKey: "stakeHolderName",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="StakeHolder Name" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <div>
            <span className="font-semibold">{row.original["stakeholder_name"]}</span>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Address" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">{row.original["stakeholder_address"]}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "officePhone",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Office Phone" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">{row.original["stakeholder_ofc_phone"]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "contactPerson",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Contact Person" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <span className="font-semibold">{row.original["contact_person"]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "contactPhone",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Contact Phone" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold text-primaryLight-500 text-center">{row.original["contact_mobile"]}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "addedOn",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Added On" />;
    },
    cell: ({ row }) => {
      return (
        <div>
           <p>{row.original["createdAt"]}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Action" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <Link href={`/stakeholders/${row.original["id"]}`} className="font-semibold text-primaryLight-500">Details</Link>
          <span className="font-semibold text-primaryLight-500 flex items-center"><HiPencilAlt />Edit </span>
        </div>
      );
    },
  },
];
