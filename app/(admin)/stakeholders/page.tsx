
"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  return(
    <>
    <PageHead headText="Stakeholder (22)" subText="View all your Stakeholder here" buttonText="Add Stakeholder" buttonAction={()=> router.push("/stakeholders/add")} />
    <DataTable columns={columns} data={data} clickAction={()=> router.push("/stakeholders/23")}/>
  </>
  )
}
