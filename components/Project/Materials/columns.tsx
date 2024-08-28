"use client";

import EditCell, {
  DeleteCell,
} from "@/app/(admin)/facility/all-flats/EditCell";
import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { ProjectPageFormType } from "@/store/useTableActionStore";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { IMaterialsByProjectData } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IMaterialsByProjectData>[] = [
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Description"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <div>
            <p className="font-semibold underline text-primaryLight">
              {row.original["description"]}
            </p>
            <p className="uppercase">{row.original["material_code"]}</p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "supplier_name",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Supplier"
          withSort={false}
        />
      );
    },
  },
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
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Quantity"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="">
          <span className="font-semibold">x{row.original["quantity"]}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "unit_price",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Unit Price"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      const { unit_price } = row.original;
      return (
        <div className="">
          <span className="font-semibold">{formatCurrency(unit_price)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "total_price",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Total Price"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      const { total_price } = row.original;
      return (
        <div className="">
          <span className="font-semibold">{formatCurrency(total_price)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "dateAdded",
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
      const { createdAt } = row.original;
      const formatted = formatDate(createdAt);
      return (
        <div className="">
          <span className="font-semibold ">{formatted}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <ColumnHeader
          column={column}
          title="Action"
          withSort={false}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <EditCell
          action={"material-edit" as ProjectPageFormType}
          row={row}
          rowId={row.original.id}
        />
      );
    },
  },
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => {
  //     return <ColumnHeader column={column} title="Actions" withSort={false} />;
  //   },
  //   cell: ({ row }) => {
  //     const { id } = row.original;
  //     return (
  //       <DeleteCell
  //         row={row}
  //         rowId={Number(id)}
  //         url="material"
  //         query="get all materials by project code"
  //       />
  //     );
  //   },
  // },
];
