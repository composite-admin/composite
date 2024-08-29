"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { HiOutlineCog, HiUserAdd } from "react-icons/hi";
import { IProjectFlatData } from "./page";

export const columns: ColumnDef<IProjectFlatData>[] = [
  {
    accessorKey: "flat_code",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Fiat Code"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold text-primaryLight-500 flex items-cente uppercase">
            {row.original["flat_code"]}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "flat_desc",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Fiat Description"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold "> {row.original["flat_desc"]}</span>
        </div>
      );
    },
  },

  // {
  //   accessorKey: "flat_id",
  //   header: ({ column }) => {
  //     return <ColumnHeader column={column} title="Actions" />;
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <Link
  //         href={"/facility/all-flats"}
  //         className="text-primaryLight-500 underline flex gap-1.5 items-center font-medium"
  //       >
  //         <ViewUserPageIcon />
  //         View
  //       </Link>
  //     );
  //   },
  // },
];
