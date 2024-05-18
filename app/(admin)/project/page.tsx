"use client";
import { useEffect } from "react";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";
import { useAddProjectModal } from "@/store/inventory/UseInventoryModal";
import { useRouter } from "next/navigation";
import useProjectActionsStore from "@/store/actions/projectActions"
import { useGetAllProjectData } from "@/hooks/useSelectOptions";

export default function ProjectPage() {
  const onOpen = useAddProjectModal((state) => state.onOpen);
  const { projects } = useGetAllProjectData();
  console.log(projects);
  const router = useRouter();

  // const projects = useProjectActionsStore<any>((state) => state.items);
  // const getAllProjects = useProjectActionsStore<any>((state) => state.getAllProjects);

  // useEffect(() => {
  //   getAllProjects();
  // }, [getAllProjects]);

  return (
    <>
      <PageHead
        headText={`Projects (${projects ? projects.length : 0})`}
        subText="View all your Items here"
        buttonText="Add Project"
        buttonAction={onOpen}
      />
      <DataTable columns={columns} data={projects ? projects : []} />
    </>
  );
}
