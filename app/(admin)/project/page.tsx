"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";
import { useAddProjectModal } from "@/store/inventory/UseInventoryModal";
import { useRouter } from "next/navigation";


export default function ProjectPage() {
  const onOpen = useAddProjectModal(state => state.onOpen)
  const router = useRouter()
  return (
    <>
      <PageHead headText="Project" subText="View all your Items here" buttonText="Add Project" buttonAction={onOpen}/>
      <DataTable columns={columns} data={data} clickAction={()=> router.push("/project/12")}/>
    </>
  )
}
