import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "../../../utils/formatDate";
import { ViewUserPageIcon } from "@/components/icons";
import Link from "next/link";
import { IManageStaffData } from "@/utils/types";
import EditCell, { ViewCell } from "../facility/all-flats/EditCell";

export const columns: ColumnDef<IManageStaffData>[] = [
  {
    accessorKey: "full_name",

    header: ({ column }) => {
      return <ColumnHeader column={column} title="Full Name" />;
    },
    cell: ({ row }) => {
      const { firstname, lastname, middlename, userid } = row.original;
      return (
        <div className="">
          <div className="flex gap-2.5 items-center">
            <AvatarComponent />
            <div className="flex flex-col">
              <span className="capitalize font-semibold">
                {firstname} {middlename} {lastname}
              </span>
              <p className="uppercase text-textColor">{userid}</p>
            </div>
          </div>
        </div>
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

  //   {
  //     accessorKey: "status",
  //     header: ({ column }) => {
  //       return <ColumnHeader column={column} title={"Status"} withSort={false} />;
  //     },
  //     cell: ({ row }) => {
  //       const status = row.getValue("status") as IManageStaffData[""];
  //       return (
  //         <div className="flex gap-2 items-center">
  //           <span
  //             className={`capitalize p-2 w-max font-semibold rounded-3xl text-xs ${
  //               status === "active"
  //                 ? "text-green-500 bg-[#E7F6EC]"
  //                 : "text-[#865503] bg-[#FEF6E7]"
  //             }`}
  //           >
  //             {status}
  //           </span>
  //         </div>
  //       );
  //     },
  //   },
  {
    accessorKey: "userid",
    header: ({ column }) => {
      return <ColumnHeader column={column} title={"Edit"} withSort={false} />;
    },
    cell: ({ row }) => {
      let href = String(row.getValue("viewAction"));
      return (
        <>
          <EditCell href={`facility/tenant/${href}`} />
        </>
      );
    },
  },
  {
    accessorKey: "userid",
    header: ({ column }) => {
      return <ColumnHeader column={column} title={"View"} withSort={false} />;
    },
    cell: ({ row }) => {
      let href = String(row.getValue("viewAction"));
      return (
        <>
          <ViewCell href={`facility/tenant/${href}`} />
        </>
      );
    },
  },
];
