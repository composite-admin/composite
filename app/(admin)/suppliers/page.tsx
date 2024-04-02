"use client"
import { useEffect } from "react";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";
import { useRouter } from "next/navigation";
import useSuppliersActionsStore from "@/store/actions/suppliersActions"

export default function SuppliersPage() {
  const router = useRouter()

  const suppliers = useSuppliersActionsStore<any>((state: any) => state.items);
  const getAllSuppliers = useSuppliersActionsStore<any>((state: any) => state.getAllSuppliers);

  useEffect(() => {
    getAllSuppliers();
  }, [getAllSuppliers]);

  return(
    <>
      <PageHead headText={`Suppliers (${suppliers.data ? suppliers.data.length : 0})`} subText="View all your suppliers here" buttonText="Add Supplier" buttonAction={()=> router.push("/suppliers/add")} />
      <DataTable columns={columns} data={suppliers.data ? suppliers.data : []} />
    </>
  )
}
