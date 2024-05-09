"use client";

import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { data } from "./data";
import { columns } from "./columns";
import {
  useGetClientProjectData,
  useProjectData,
} from "@/hooks/useSelectOptions";
import useAuthStore, { userStore } from "@/store/auth/AuthStore";

export default function ClientProjectPage() {
  const { userId } = userStore();
  const idString = userId !== null ? userId.toString() : "";
  const { ClientProjectDetails, isClientProjectLoading } =
    useGetClientProjectData(idString.replace("cli-", ""));
  return (
    <>
      <PageHead headText="Project" subText="View all your projects here" />
      <DataTable
        columns={columns}
        data={ClientProjectDetails ?? []}
        isLoading={isClientProjectLoading}
      />
    </>
  );
}
