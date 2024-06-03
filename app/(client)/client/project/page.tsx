"use client";

import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { useGetClientProjectData } from "@/hooks/useSelectOptions";
import { userStore } from "@/store/auth/AuthStore";

export default function ClientProjectPage() {
  const { userId } = userStore();
  const idString = userId !== null ? userId.toString() : "";

  const { ClientProjectDetails, isClientProjectLoading } =
    useGetClientProjectData(idString);

  return (
    <>
      <PageHead
        headText={`Project (${ClientProjectDetails?.length || 0})`}
        subText="View all your projects here"
      />
      <DataTable
        columns={columns}
        data={ClientProjectDetails ?? []}
        isLoading={isClientProjectLoading}
      />
    </>
  );
}
