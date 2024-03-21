import { DataTable } from "@/components/shared/DataTable";
import PageHead from "@/components/ui/pageHead";
import { columns } from "./columns";
import { data } from "./data";
import ProjectSuccessModal from "@/components/Modals/projects/ProjectSuccessModal";
import AddStartUp from "@/components/Modals/projects/AddStartUpModal";
import AddStakeHolderModal from "@/components/Modals/projects/AddStakeholderModel";
import AddContractorModal from "@/components/Modals/projects/AddContractorModal";
import AddMaterial from "@/components/Modals/projects/AddMaterialModel";


export default function page() {
  return (
    <>
      <PageHead headText="Project" subText="View all your Items here" buttonText="Add Project" />
      <DataTable columns={columns} data={data} />

      {/* <AddMaterial /> */}
    </>
  )
}
