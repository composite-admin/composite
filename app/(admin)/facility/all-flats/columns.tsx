"use client";

import { ViewUserPageIcon } from "@/components/icons";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ColumnDef } from "@tanstack/react-table";

import EditCell from "./EditCell";
import { useEditFlatModal } from "@/store/modals/useCreateModal";
import { IFlatData } from "@/utils/types";
import { formatDate } from "@/utils/formatDate";

export const columns: ColumnDef<IFlatData>[] = [
  {
    accessorKey: "flat_code",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Flat Code" withSort={false} />
      );
    },
    cell: ({ row }) => {
      return (
        <p className="text-primaryLight underline uppercase font-semibold">
          {row.getValue("flat_code")}
        </p>
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
  },

  {
    accessorKey: "flat_desc",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Flat Description"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      return <span>{row.getValue("flat_desc")}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <ColumnHeader column={column} title="Created On" withSort={false} />
      );
    },
    cell: ({ row }) => {
      const { createdAt } = row.original;
      const formattedDate = formatDate(createdAt);
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "comment",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Comments" withSort={false} />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Status" withSort={false} />;
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as IFlatData["status"];
      return (
        <div className="flex gap-2 items-center">
          <span
            className={`capitalize p-2 w-max font-semibold rounded-3xl text-xs ${
              status === "active"
                ? "text-green-500 bg-[#E7F6EC]"
                : "text-[#865503] bg-[#FEF6E7]"
            }`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "flat_id",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Action" withSort={false} />;
    },
    cell: ({ row }) => {
      let { flat_code } = row.original;
      return (
        <>
          <EditCell
            isLink={false}
            projectCode={String(flat_code)}
            row={row}
            action={"edit_flat"}
          />
        </>
      );
    },
  },
];

interface EditCellProps {
  isLink: boolean;
  action: string;
  children?: React.ReactNode;
}

const withEditFlatModal = <P extends EditCellProps>(
  Component: React.ComponentType<P>
) => {
  const WrappedComponent = (props: P) => {
    const { onOpen, setProjectCode } = useEditFlatModal();

    const handleEditClick = () => {
      onOpen();
      setProjectCode(props.action);
    };

    return (
      <Component {...props} onClick={handleEditClick}>
        {props.children}
      </Component>
    );
  };

  // Set the display name for the wrapped component
  WrappedComponent.displayName = "WithEditFlatModal";

  return WrappedComponent;
};

export const EditCellWithModal = withEditFlatModal(EditCell);