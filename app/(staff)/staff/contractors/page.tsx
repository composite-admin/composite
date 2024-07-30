"use client";
import { useEffect } from "react";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import useContractorsActionsStore from "@/store/actions/contractorsActions";
import { useGetAllContractors } from "@/hooks/useSelectOptions";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";

export default function ContractorsPage() {
  const router = useRouter();
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_CREATE = staffPrivilege?.find(
    (item: any) => item.type === "contractor"
  )?.can_create;

  const contractors = useContractorsActionsStore<any>(
    (state: any) => state.items
  );
  const getAllContractors = useContractorsActionsStore<any>(
    (state: any) => state.getAllContractors
  );

  useEffect(() => {
    getAllContractors();
  }, [getAllContractors]);
  const { contractor, isLoading } = useGetAllContractors();

  return (
    <>
      <PageHead
        headText={`Contractors (${
          contractors.data ? contractors.data.length : 0
        })`}
        disabled={!CAN_CREATE}
        subText="View all your contractors here"
        buttonText="Add Contractor"
        buttonAction={() => router.push("/staff/contractors/add")}
      />
      <DataTable
        columns={columns}
        data={contractor || []}
        isLoading={isLoading}
      />
    </>
  );
}
