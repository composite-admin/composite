"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { useAddProjectModal } from "@/store/inventory/UseInventoryModal";
import { useGetAllProjectData } from "@/hooks/useSelectOptions";
import { userStore } from "@/store/auth/AuthStore";
import { IProjectData } from "@/utils/types";
import { getCookie } from "cookies-next";

export default function ProjectPage() {
  const onOpen = useAddProjectModal((state) => state.onOpen);
  const { userType } = userStore();
  const username = getCookie("username");
  const { projects, isLoading } = useGetAllProjectData();

  const filterProjectBySupervisor = projects?.filter(
    (project: IProjectData) =>
      project.project_supervisor === username && userType === "supervisor"
  );

  return (
    <>
      <PageHead
        headText={`Projects (${
          userType === "admin"
            ? projects?.length || 0
            : filterProjectBySupervisor?.length || 0
        })`}
        subText="View all your Items here"
        buttonText="Add Project"
        buttonAction={onOpen}
      />

      <DataTable
        columns={columns}
        data={
          userType === "admin"
            ? projects || []
            : filterProjectBySupervisor || []
        }
        isLoading={isLoading}
      />
    </>
  );
}
