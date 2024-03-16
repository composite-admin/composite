"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ChevronUp, ChevronDown } from "lucide-react";

export type DashboardType = {
  id: string;
  projectName: string;
  amountSpent: string;
  materials: string;
  labour: string;
  toolsAndMachine: string;
  cashAdvance: string;
};

export const columns: ColumnDef<DashboardType>[] = [
  {
    accessorKey: "projectName",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          <p>Project Name</p>
          <div>
            <ChevronUp
              className="h-5 w-5 cursor-pointer"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            />
            <ChevronDown
              className="h-5 w-5 cursor-pointer "
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "amountSpent",
    header: "Amount Spent",
  },
  {
    accessorKey: "materials",
    header: "Materials",
  },
  {
    accessorKey: "labour",
    header: "Labour",
  },
  {
    accessorKey: "toolsAndMachine",
    header: "Tools and Machines",
  },
  {
    accessorKey: "cashAdvance",
    header: "Cash Advance",
  },
];
