"use client";
import { useEffect } from "react";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";
import { useAddProjectModal } from "@/store/inventory/UseInventoryModal";
import { useRouter } from "next/navigation";
import useProjectActionsStore, {ProjectStoreState} from "@/store/actions/projectActions"

export default function ProjectPage() {
  const onOpen = useAddProjectModal(state => state.onOpen)
  const router = useRouter()

  const projects = useProjectActionsStore<any>((state) => state.items);
  const getAllProjects = useProjectActionsStore<any>((state) => state.getAllProjects);
  const createProject = useProjectActionsStore<any>((state) => state.createProject)

  console.log("projects", projects)

  useEffect(() => {
    getAllProjects();
  }, [getAllProjects]);

  return (
    <>
      <PageHead headText={`Projects (${projects.data ? projects.data.length : 0})`} subText="View all your Items here" buttonText="Add Project" buttonAction={onOpen}/>
      <DataTable columns={columns} data={projects.data ? projects.data : []}/>
    </>
  )
}
