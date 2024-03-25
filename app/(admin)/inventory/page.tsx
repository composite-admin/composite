"use client"
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./picked/columns";
import { data } from "./picked/data";
import { useInventoryDetails } from "@/store/inventory/UseInventoryModal";

export default function InventoryPage() {
  
  return (
    <>
      <PageHead headText="Inventory" subText="View all your inventories here" />
      <DataTable columns={columns} data={data} />
    </>
  )
}
