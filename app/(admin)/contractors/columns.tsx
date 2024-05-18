"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useAddWorkerModal } from "@/store/inventory/UseInventoryModal";
import { formatDate } from "@/utils/formatDate";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiUserAdd, HiPencilAlt } from "react-icons/hi";


export type ContractorType = {
    id: string;
    contractor_code: string;
    contractor_name: string;
    contractor_service: string;
    contractor_address: string;
    contractor_ofc_phone: string;
    contact_person: string;
    contact_mobile: string;
    contact_home_phone: string;
    email: string;
    website: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
};



export const columns: ColumnDef<ContractorType>[] = [
  {
    accessorKey: "contractor_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Contractor" />;
    },
    cell: ({ row }) => {
      return (
        <Link href={`/contractors/${row.original["id"]}`}>
          <div className="flex  flex-col">
            <span className="w-32 font-semibold text-primaryLight-500 truncate underline">
              {row.original["contractor_name"]}
            </span>
            <span className="text-xs font-semibold text-gray-500">
              {row.original["contractor_code"]}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "contractor_address",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Address" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">
            {row.original["contractor_address"]}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "contractor_ofc_phone",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Office Phone" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">
            {row.original["contractor_ofc_phone"]}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "contact_person",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Contact Person" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <AvatarComponent />
          <span className="font-semibold">
            {row.original["contact_person"]}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "contact_mobile",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Contact Phone" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold text-primaryLight-500 text-center">
            {row.original["contact_mobile"]}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Added On" withSort={false} />;
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
    accessorKey: "action",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Action" />;
    },
    cell: ({ row }) => {
      // const onOpen = useAddWorkerModal(state => state.onOpen);
      return (
        <div className="">
          <Link href={`/contractors/${row.original["id"]}/edit`}>
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
