"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useWorkersActionsStore from "@/store/actions/workersActions";

export default function WorkersPage() {
  const router = useRouter();

  const workers = useWorkersActionsStore<any>((state: any) => state.items);
  const getAllWorkers = useWorkersActionsStore<any>((state: any) => state.getAllWorkers);

  useEffect(() => {
    getAllWorkers();
  }, [getAllWorkers]);

  return (
    <>
      <PageHead
        headText={`Workers (${workers.data ? workers.data.length : 0})`}
        subText="View all your workers here"
        buttonText="Add Worker"
        buttonAction={() => router.push("/workers/add")}
      />
      <DataTable columns={columns} data={workers ? workers : []} clickAction={() => {}} />
    </>
  );
}
