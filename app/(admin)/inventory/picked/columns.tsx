"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useInventoryDetails } from "@/store/inventory/UseInventoryModal";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type ReportType = {
  id: string;
  requestType: string;
  toolName: string;
  quantity: string;
  project: string;
  pickedOn: string;
  pickedBy: string;
  status: string;
  returnedOn: string;
};

export const columns: ColumnDef<ReportType>[] = [
  {
    accessorKey: "requestType",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Request Type" />;
    },
    cell: ({ row }) => {
      const onOpen = useInventoryDetails((state) => state.onOpen);
      return (
        <div className="flex  flex-col cursor-pointer" onClick={onOpen}>
          <span className="w-32 font-semibold text-primaryLight-500 truncate underline">
            Tools and Machinery
          </span>
          <span>RCPD119548</span>
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
          <span className="font-semibold ">Weldng Machine / Generator</span>
        </div>
      );
    },
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Quantity" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">x1</span>
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
          <span className="font-semibold ">Graceland Kickoff</span>
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
      return (
        <div className="">

          <p>6th July, 2002</p>
          <p>10am</p>
        </div>
      );
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
          <AvatarComponent />
          <span className="font-semibold">Alison Ogaga</span>
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
        <p className='bg-[#E7F6EC] px-1 text-[12px] w-fit rounded-full text-[#036B26]'>Completed</p>
      );
    },
  },
  {
    accessorKey: "returnedOn",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Returned On" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">

          <p>6th July, 2002</p>
          <p>10am</p>
        </div>
      );
    },
  },
];
