"use client";

import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatCurrency, formatToNaira } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { IWorkerData, IWorkerJobData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiEye, HiOutlineCog, HiPencilAlt, HiUserAdd } from "react-icons/hi";
import EditCell from "../../facility/all-flats/EditCell";

export const columns: ColumnDef<IWorkerData>[] = [
  {
    accessorKey: "worker_code",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Job Code"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold uppercase">
            {/* {worker_code ? worker_code.toUpperCase() : "N/A"}
             */}
            {row.original?.worker_code}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "service_type",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Service"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      const service_type = row.original?.worker_service;
      return (
        <div className="">
          <span className="font-semibold ">{service_type}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "worker_service_charge",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Service Charge"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      const worker_service_charge = row.original?.worker_service_charge;
      const formatted = formatCurrency(worker_service_charge);
      return (
        <div className="">
          <span className="font-semibold ">{formatted ?? "N/A"}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "amount_paid",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Amount Paid"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      const amount_paid = row.original?.amount_paid;
      const formatted = formatCurrency(amount_paid);
      return (
        <div className="">
          <span className="font-semibold ">{formatted ?? "N/A"}</span>
        </div>
      );
    },
  },

  // {
  //   accessorKey: "outstanding_balance",
  //   header: ({ column }) => {
  //     return <ColumnHeader column={column} title="Balance" withSort={false} />;
  //   },
  //   cell: ({ row }) => {
  //     const outstanding_balance = row.original?.outstanding_balance;
  //     const formatted = formatCurrency(outstanding_balance);
  //     return (
  //       <div className="">
  //         <span className="font-semibold ">{formatted ?? "N/A"}</span>
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "comment",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Comment"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      const comment = row.original?.comment;
      return (
        <div className="">
          <span className="font-semibold ">{comment}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Date Added"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      const createdAt = row.original?.createdAt;
      const formatted = formatDate(createdAt);
      return (
        <div className="">
          <span className="font-semibold ">{formatted ?? "N/A"}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Action"
        />
      );
    },
    cell: ({ row }) => {
      const id = row.original?.id;
      return (
        <EditCell
          action={"worker-job-edit"}
          rowId={id}
          row={row}
        />
      );
    },
  },
];
