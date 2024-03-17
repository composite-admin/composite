"use client";

import { ColumnHeader } from "@/components/shared/ColumnHeader";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import { ChevronsUpDown } from "lucide-react";

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
      return <ColumnHeader column={column} title="Project Name" />;
    },
  },
  {
    accessorKey: "amountSpent",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Amount Spent" />;
    },
  },
  {
    accessorKey: "materials",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Materials" />;
    },
  },
  {
    accessorKey: "labour",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Labour" />;
    },
  },
  {
    accessorKey: "toolsAndMachine",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Tools And Machine" />;
    },
  },
  {
    accessorKey: "cashAdvance",
    header: ({ column }) => {
      return <ColumnHeader column={column} title="Cash Advance" />;
    },
  },
];

