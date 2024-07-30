import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { ViewUserPageIcon } from "@/components/icons";
import Link from "next/link";
import { IManageStaffData } from "@/utils/types";
import EditCell, { ViewCell } from "@/app/(admin)/facility/all-flats/EditCell";

export const columns: ColumnDef<IManageStaffData>[] = [
  {
    accessorKey: "firstname",
    accessorFn: (row) => {
      return `${row.firstname} ${row.middlename} ${row.lastname}`;
    },
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Full Name" />;
    },
    cell: ({ row }) => {
      const { firstname, lastname, middlename, userid } = row.original;
      return (
        <Link href={`manage-staff/staff/${userid}`}>
          <div className="flex gap-2.5 items-center">
            <AvatarComponent />
            <div className="flex flex-col">
              <span className="capitalize font-semibold underline text-primaryLight font-semibold">
                {firstname} {middlename} {lastname}
              </span>
              <p className="uppercase text-textColor">{userid}</p>
            </div>
          </div>
        </Link>
      );
    },
  },

  {
    accessorKey: "sex",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Gender" />;
    },
  },

  {
    accessorKey: "role",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Role" />;
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Email Address" />;
    },
  },
  {
    accessorKey: "cell_phone",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Contact Phone" />;
    },
  },
  {
    accessorKey: "userid",
    header: ({ column }) => {
      return <ColumnHeader column={column} title={"Edit"} withSort={false} />;
    },
    cell: ({ row }) => {
      const { userid } = row.original;
      return (
        <>
          <EditCell href={`manage-staff/edit/${userid}`} isLink />
        </>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <ColumnHeader column={column} title={"View"} withSort={false} />;
    },
    cell: ({ row }) => {
      let { userid } = row.original;
      return (
        <>
          <ViewCell href={`manage-staff/staff/${userid}`} isLink={true} />
        </>
      );
    },
  },
];
