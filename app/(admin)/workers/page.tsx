"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useWorkersActionsStore from "@/store/actions/worker/workersActions";

export default function WorkersPage() {
  const router = useRouter();

  const { getAllWorkers, workers, fetching } = useWorkersActionsStore();

  useEffect(() => {
    getAllWorkers();
  }, [getAllWorkers]);

  return (
    <>
      <PageHead
        headText={`Workers (${workers ? workers.length : 0})`}
        subText="View all your workers here"
        buttonText="Add Worker"
        buttonAction={() => router.push("/workers/add")}
      />
      <DataTable columns={columns} data={workers ? workers : []} clickAction={() => {}} isLoading={fetching} />
    </>
  );
}
