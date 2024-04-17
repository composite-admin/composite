import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { IClientData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "../../../utils/formatDate";
import { ViewUserPageIcon } from "@/components/icons";
import Link from "next/link";

export const columns: ColumnDef<IClientData>[] = [
  {
    accessorKey: "full_name",

    header: ({ column }) => {
      return <ColumnHeader column={column} title="Full Name" />;
    },
    cell: ({ row }) => {
      const { first_name, last_name, activation_code, image } = row.original;
      return (
        <div className="">
          <div className="flex gap-2.5 items-center">
            <AvatarComponent />
            <div className="flex flex-col">
              <span className="capitalize font-semibold">
                {first_name} {last_name}
              </span>
              <p>{activation_code}</p>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Email Address" />;
    },
  },
  {
    accessorKey: "mobile_number",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Contact Phone" />;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Date Added" />;
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const formattedDate = formatDate(createdAt);
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Actions" withSort={false} />;
    },
    cell: ({ row }) => {
      const { client_id } = row.original;
      return (
        <Link
          href={`manage-client/client-details/${client_id}`}
          className="text-primaryLight-500 underline flex items-center font-medium"
        >
          View
        </Link>
      );
    },
  },
];
