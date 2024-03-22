"use client";

import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./pending-project/columns";
import { data } from "./pending-project/data";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  return(
    <>
    <PageHead headText="Contractor(22)" subText="View all your contractors here" buttonText="Add Contractor" buttonAction={()=> router.push("/contractors/add")}/>
    <DataTable columns={columns} data={data} clickAction={()=> router.push("/contractors/23")} />
  </>
  )
}
