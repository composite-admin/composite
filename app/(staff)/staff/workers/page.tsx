"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useWorkersActionsStore from "@/store/actions/worker/workersActions";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";

export default function WorkersPage() {
  const router = useRouter();

  const { getAllWorkers, workers, fetching } = useWorkersActionsStore();
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_CREATE = staffPrivilege?.find(
    (item: any) => item.type === "worker"
  )?.can_create;

  useEffect(() => {
    getAllWorkers();
  }, [getAllWorkers]);

  return (
    <>
      <PageHead
        headText={`Workers (${workers ? workers.length : 0})`}
        subText="View all your workers here"
        disabled={!CAN_CREATE}
        buttonText="Add Worker"
        buttonAction={() => router.push("/staff/workers/add")}
      />
      <DataTable
        columns={columns}
        data={workers ? workers : []}
        clickAction={() => {}}
        isLoading={fetching}
      />
    </>
  );
}
