"use client"
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { useInventoryDetails } from "@/store/inventory/UseInventoryModal";
import { columns } from "./columns";
// import { data } from "./data";
import { useRouter } from "next/navigation";
import useFetchInventoryData from "@/mutations/InventoryMutation";
import useGetAllInventory from "@/store/inventory/InventoryStore";
import { useEffect, useState } from "react";

export default function InventoryPage() {
  const onOpen = useInventoryDetails(state => state.onOpen);
  const router = useRouter() 

  const { action, isError, isSuccess, error } = useFetchInventoryData();

  const { inventoryData } = useGetAllInventory();


  useEffect(() => {
    action();
  }, [])

  const [data, setData] = useState<any[]>([]);

  useEffect(()=> {
    setData(inventoryData);
  }, [inventoryData])

  return (
    <>
      <PageHead headText="Inventory" subText="View all your inventories here" buttonText="Add Inventory" buttonAction={()=> router.push("/inventory/new")}/>
      {/* <DataTable columns={columns} data={data} clickAction={()=> onOpen()}/> */}
      {
        data?.length > 0 &&
        <DataTable columns={columns} data={data} />
      }
    </>
  )
}
