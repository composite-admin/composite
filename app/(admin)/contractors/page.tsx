"use client";
import { useEffect } from "react";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./pending-project/data";
import { useRouter } from "next/navigation";
import useContractorsActionsStore from "@/store/actions/contractorsActions"

export default function ContractorsPage() {
  const router = useRouter();

  const contractors = useContractorsActionsStore<any>((state: any) => state.items);
  const getAllContractors = useContractorsActionsStore<any>((state: any) => state.getAllContractors);
  
  useEffect(() => {
    getAllContractors();
  }, [getAllContractors]);


  return(
    <>
    <PageHead headText={`Contractors (${contractors.data ? contractors.data.length : 0})`} subText="View all your contractors here" buttonText="Add Contractor" buttonAction={()=> router.push("/contractors/add")}/>
    <DataTable columns={columns} data={contractors.data ? contractors.data : []} clickAction={()=> router.push("/contractors/23")} />
  </>
  )
}
