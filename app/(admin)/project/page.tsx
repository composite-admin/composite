"use client";
import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";
import ProjectSuccessModal from "@/components/Modals/projects/ProjectSuccessModal";
import AddStartUp from "@/components/Modals/projects/AddStartUpModal";
import AddStakeHolderModal from "@/components/Modals/projects/AddStakeholderModel";
import AddContractorModal from "@/components/Modals/projects/AddContractorModal";
import AddMaterial from "@/components/Modals/projects/AddMaterialModel";
import { useAddProjectModal } from "@/store/inventory/UseInventoryModal";


export default function page() {
  const onOpen = useAddProjectModal(state => state.onOpen)
  return (
    <>
      <PageHead headText="Project" subText="View all your Items here" buttonText="Add Project" buttonAction={onOpen}/>
      <DataTable columns={columns} data={data} />

      {/* <AddMaterial /> */}
    </>
  )
}
