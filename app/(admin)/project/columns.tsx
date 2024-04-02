"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useAddWorkerModal } from "@/store/inventory/UseInventoryModal";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiUserAdd } from "react-icons/hi";

export type ReportType = {
  id: string;
  projectName: string;
  startDate: string;
  endDate: string;
  status: string;
  totalWorker: string;
  worker: string;
  materials: string;
};
// {
//   "id": 1,
//   "project_name": "Project A",
//   "project_description": "Description of Project C",
//   "project_code": "proj-0001",
//   "project_location": "Location C",
//   "address": "123 Main St",
//   "city": "City A",
//   "state": "State A",
//   "lga": "LGA C",
//   "project_duration": "181",
//   "start_date": "2024-01-01",
//   "end_date": "2024-06-30",
//   "comment": "Comment for Project A",
//   "status": "Active",
//   "date_added": "2024-02-28 21:54:01.63679+00",
//   "project_supervisor": "Supervisor A",
//   "supervisor_id": "SV001",
//   "createdBy": "admin-102",
//   "createdAt": "2024-02-28T21:54:01.636Z",
//   "updatedAt": "2024-03-27T11:59:33.660Z"
// }
export const columns: ColumnDef<ReportType>[] = [
  {
    accessorKey: "projectName",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Project Name" />;
    },
    cell: ({ row }) => {
      return (
        <Link href={`/project/${row.original["id"]}`}>
          <div className="flex  flex-col">
            <span className="w-32 font-semibold text-primaryLight-500 truncate underline">
            {row.original["project_name"]}
            </span>
          </div>
        </Link>
      );
    },
  },

  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Start Date" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">{row.original["start_date"]}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="End Date" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold ">{row.original["end_date"]}</span>
        </div>
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
          <p className='bg-[#E7F6EC] px-1 text-[12px] w-fit rounded-full text-[#036B26]'>{row.original["status"]}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "totalWorker",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Total Worker" />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold text-primaryLight-500 text-center">99</span>
        </div>
      );
    },
  },
  {
    accessorKey: "worker",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Worker" />;
    },
    cell: ({ row }) => {
      // const onOpen = useAddWorkerModal(state => state.onOpen);
      return (
        <Link href={"/project/add-worker"}>
          <div className="cursor-pointer" >
            <span className="font-semibold text-primaryLight-500 flex items-center hover:underline"><HiUserAdd />Add </span>
          </div>
        </Link>
      );
    },
  },
];
