
"use client";
import { useEffect } from "react";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";
import { useRouter } from "next/navigation";
import useStakeholdersActionsStore from "@/store/actions/stakeholdersActions"

export default function StakeholdersPage() {
  const router = useRouter();

  const stakeholders = useStakeholdersActionsStore<any>((state: any) => state.items);
  const getAllStakeholders = useStakeholdersActionsStore<any>((state: any) => state.getAllStakeholders);

  useEffect(() => {
    getAllStakeholders();
  }, [getAllStakeholders]);

  return(
    <>
    <PageHead headText={`Stakeholders (${stakeholders.data ? stakeholders.data.length : 0})`} subText="View all your Stakeholder here" buttonText="Add Stakeholder" buttonAction={()=> router.push("/stakeholders/add")} />
    <DataTable columns={columns} data={stakeholders.data ? stakeholders.data : []}  clickAction={() => {}}/>
  </>
  )
}
