"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useAddWorkerModal } from "@/store/inventory/UseInventoryModal";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiPencilAlt, HiUserAdd } from "react-icons/hi";

export type ReportType = {
  id: string;
  description: string;
  type: string;
  cost: string,
  dateAdded: string;
}

// export type ReportType = {
//   id: string;
//   project_name: string;
//   project_description: string;
//   project_code: string;
//   project_location: string;
//   address: string;
//   city: string;
//   state: string;
//   lga: string;
//   project_duration: string;
//   start_date: string;
//   end_date: string;
//   comment: string;
//   status: string;
//   date_added: string;
//   project_supervisor: string;
//   supervisor_id: string;
//   createdBy: string;
//   createdAt: string;
//   updatedAt: string;
// }
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Description" />;
    },
    cell: ({ row }) => {
      return (
        // <Link href={`/project/${row.original["id"]}`}>
        <div className="flex gap-2 items-center">
          <p className="font-semibold ">Electricity</p>
        </div>
        // </Link>
      );
    },
  },

  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Type" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">Agency</span>
        </div>
      );
    },
  },

  {
    accessorKey: "cost",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Cost" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <p className='bg-[#E7F6EC] px-1 text-[12px] w-fit rounded-full text-[#036B26]'>N100,000</p>
        </div>
      );
    },
  },
  {
    accessorKey: "dateAdded",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Date Added" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <p className='bg-[#E7F6EC] px-1 text-[12px] w-fit rounded-full text-[#036B26]'>6 July, 2023</p>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="hover:underline font-semibold text-primaryLight-500 flex items-center"><HiPencilAlt />Edit </span>
        </div>
      );
    },
  },

];
