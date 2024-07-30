"use client";
import { useEffect } from "react";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import useStakeholdersActionsStore from "@/store/actions/stakeholdersActions";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";

export default function StakeholdersPage() {
  const router = useRouter();
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_CREATE = staffPrivilege?.find(
    (item: any) => item.type === "stakeholder"
  )?.can_create;
  const stakeholders = useStakeholdersActionsStore<any>(
    (state: any) => state.items
  );
  const getAllStakeholders = useStakeholdersActionsStore<any>(
    (state: any) => state.getAllStakeholders
  );

  useEffect(() => {
    getAllStakeholders();
  }, [getAllStakeholders]);

  return (
    <>
      <PageHead
        headText={`Stakeholders (${
          stakeholders.data ? stakeholders.data.length : 0
        })`}
        disabled={!CAN_CREATE}
        subText="View all your Stakeholder here"
        buttonText="Add Stakeholder"
        buttonAction={() => router.push("/staff/stakeholders/add")}
      />
      <DataTable
        columns={columns}
        data={stakeholders.data ? stakeholders.data : []}
        isLoading={!stakeholders.data ? true : false}
      />
    </>
  );
}
