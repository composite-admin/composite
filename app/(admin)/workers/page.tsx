"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";
import { useRouter } from "next/navigation";


export default function page() {
  const router = useRouter()
  
  return(
    <>
    <PageHead headText="Workers (22)" subText="View all your Workers here" buttonText="Add Workers " buttonAction={()=> router.push("/workers/add")} />
    <DataTable columns={columns} data={data} clickAction={()=> router.push("workers/12")}/>
  </>
  )
}
