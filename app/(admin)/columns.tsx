"use client";

import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { formatCurrency } from "@/utils/formatCurrency";
import { IProjectData, PendingProjectDetails } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import TableLink from "./TableLink";

export const columns: ColumnDef<PendingProjectDetails>[] = [
  {
    accessorKey: "project_name",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Project Name" />;
    },
    cell: ({ row }) => {
      return (
        <TableLink row={row} rowId={row.original.project_code}>
          <div className="flex font-semibold  underline text-primaryLight flex-col">
            <span>{row.original["project_name"]}</span>
            <span className="uppercase text-semibold">
              {row.original["project_code"]}
            </span>
          </div>
        </TableLink>
      );
    },
  },
  {
    accessorKey: "material_amount",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Materials" />;
    },
    cell: ({ row }) => {
      return (
        <span className="font-semibold text-gray-500 uppercase text-semibold">
          {formatCurrency(row.original["material_amount"])}
        </span>
      );
    },
  },
  {
    accessorKey: "labour_approved_amount",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Labour" />;
    },
    cell: ({ row }) => {
      return (
        <span className="font-semibold text-gray-500 uppercase text-semibold">
          {formatCurrency(row.original["labour_approved_amount"])}
        </span>
      );
    },
  },
  {
    accessorKey: "machinery_approved_amount",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Tools And Machinery" />;
    },
    cell: ({ row }) => {
      return (
        <span className="font-semibold text-gray-500 uppercase text-semibold">
          {formatCurrency(row.original["machinery_approved_amount"])}
        </span>
      );
    },
  },
  {
    accessorKey: "cash_advance_approved_amount",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Cash Advance" />;
    },
    cell: ({ row }) => {
      return (
        <span className="font-semibold text-gray-500 uppercase text-semibold">
          {formatCurrency(row.original["cash_advance_approved_amount"])}
        </span>
      );
    },
  },
  {
    accessorKey: "project_code",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Total Cost" />;
    },
    cell: ({ row }) => {
      const {
        cash_advance_approved_amount,
        contractor_amount,
        labour_approved_amount,
        machinery_approved_amount,
        material_amount,
        stakeholder_amount,
        startup_cost,
      } = row?.original;

      const totalCost =
        parseFloat(cash_advance_approved_amount ?? 0) +
        parseFloat(contractor_amount ?? 0) +
        parseFloat(labour_approved_amount ?? 0) +
        parseFloat(machinery_approved_amount ?? 0) +
        parseFloat(material_amount ?? 0) +
        parseFloat(stakeholder_amount ?? 0) +
        parseFloat(startup_cost ?? 0);

      return (
        <span className="font-semibold text-gray-500 uppercase text-semibold">
          {formatCurrency(totalCost)}
        </span>
      );
    },
  },
];
