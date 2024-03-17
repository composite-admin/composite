"use client";

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
      return (
        <HeaderComponent
          title="Project Name"
          onclick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "amountSpent",
    header: ({ column }) => {
      return (
        <HeaderComponent
          title="Amount Spent"
          onclick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "materials",
    header: ({ column }) => {
      return (
        <HeaderComponent
          title="Materials"
          onclick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "labour",
    header: ({ column }) => {
      return (
        <HeaderComponent
          title="Labour"
          onclick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "toolsAndMachine",
    header: ({ column }) => {
      return (
        <HeaderComponent
          title="Tools And Machine"
          onclick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
  {
    accessorKey: "cashAdvance",
    header: ({ column }) => {
      return (
        <HeaderComponent
          title="Cash Advance"
          onclick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      );
    },
  },
];

type HeaderProps = {
  title: string;
  onclick: () => void;
};
const HeaderComponent = ({ onclick, title }: HeaderProps) => {
  return (
    <div className="flex items-center gap-2">
      {title}
      <div>
        <ChevronsUpDown className="h-5 w-5 cursor-pointer" onClick={onclick} />
      </div>
    </div>
  );
};