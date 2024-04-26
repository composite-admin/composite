"use client";

import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatCurrency, formatToNaira } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { IWorkerData, IWorkerJobData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiEye, HiOutlineCog, HiPencilAlt, HiUserAdd } from "react-icons/hi";

export const columns: ColumnDef<IWorkerData>[] = [
  {
    accessorKey: "worker_code",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Job Code" withSort={false} />;
    },
    cell: ({ row }) => {
      const worker_code = row.original?.worker_code;
      return (
        <div className="">
          <span className="font-semibold ">
            {worker_code ? worker_code.toUpperCase() : "N/A"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "service_type",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Service" withSort={false} />;
    },
    cell: ({ row }) => {
      const service_type = row.original?.service_type;
      console.log(service_type);
      return (
        <div className="">
          <span className="font-semibold ">{service_type}</span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "worker_service_charge",
  //   header: ({ column }) => {
  //     return (
  //       <ColumnHeader column={column} title="Service Charge" withSort={false} />
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const { worker_service_charge } = row.original;
  //     const formatted = formatCurrency(worker_service_charge);
  //     return (
  //       <div className="">
  //         <span className="font-semibold ">{formatted ?? "N/A"}</span>
  //       </div>
  //     );
  //   },
  // },

  // {
  //   accessorKey: "action",
  //   header: ({ column }) => {
  //     return <ColumnHeader column={column} title="Action" />;
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <div className="">
  //         <Link href="#">
  //           <span className="hover:underline font-semibold text-primaryLight-500 flex items-center">
  //             <HiPencilAlt />
  //             Edit{" "}
  //           </span>
  //         </Link>
  //       </div>
  //     );
  //   },
  // },
];
