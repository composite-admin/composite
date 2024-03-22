"use client"
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";
import { useRouter } from "next/navigation";

export default function SuppliersPage() {
  const router = useRouter()
  return(
    <>
      <PageHead headText="Supplier(22)" subText="View all your suppliers here" buttonText="Add Supplier" buttonAction={()=> router.push("/suppliers/add")} />
      <DataTable columns={columns} data={data} clickAction={()=> router.push("/suppliers/12")} />
    </>
  )
}
