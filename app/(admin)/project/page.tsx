"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";
import { useAddProjectModal } from "@/store/inventory/UseInventoryModal";


export default function ProjectPage() {
  const onOpen = useAddProjectModal(state => state.onOpen)
  return (
    <>
      <PageHead headText="Project" subText="View all your Items here" buttonText="Add Project" buttonAction={onOpen}/>
      <DataTable columns={columns} data={data} />

    </>
  )
}
