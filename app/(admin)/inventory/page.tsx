"use client"
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { useInventoryDetails } from "@/store/inventory/UseInventoryModal";
import { columns } from "./columns";
import { data } from "./data";
import { useRouter } from "next/navigation";

export default function InventoryPage() {
  const onOpen = useInventoryDetails(state => state.onOpen);
  const router = useRouter()

  return (
    <>
      <PageHead headText="Inventory" subText="View all your inventories here" buttonText="Add Inventory" buttonAction={()=> router.push("/inventory/new")}/>
      <DataTable columns={columns} data={data} clickAction={()=> onOpen()}/>
    </>
  )
}
