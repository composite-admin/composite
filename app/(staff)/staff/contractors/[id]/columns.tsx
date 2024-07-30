"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { useProjectData } from "@/hooks/useSelectOptions";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate, formatDateToString } from "@/utils/formatDate";
import { IContractorProjectData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

export const columns: ColumnDef<IContractorProjectData>[] = [
  {
    accessorKey: "contractor_project_code",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Contractor Code"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold uppercase">
            {row.original["contractor_code"]}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "project_name",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Project Name" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <span className="font-semibold uppercase">
          {row.original["project_name"]}
        </span>
      );
    },
  },
  {
    accessorKey: "approved_amount",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Amount" withSort={false} />;
    },
    cell: ({ row }) => {
      const formatted = formatCurrency(row.original["approved_amount"]);
      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Created On" />;
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
    accessorKey: "comment",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Comment" withSort={false} />;
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="">{row.original["comment"]}</span>
        </div>
      );
    },
  },

  // {
  //   accessorKey: "id",
  //   header: ({ column }) => {
  //     return <ColumnHeader column={column} title="Action" />;
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <div className="">
  //         <Link href="#">
  //           <span className="hover:underline font-semibold text-primaryLight-500 flex items-center">
  //             View{" "}
  //           </span>
  //         </Link>
  //       </div>
  //     );
  //   },
  // },

  // {
  //   accessorKey: "id",
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
