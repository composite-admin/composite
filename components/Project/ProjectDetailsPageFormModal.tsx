"use client";
import { useProjectDetailsPageFormModal } from "@/store/project/useProjectModal";
import { Modal } from "../shared/Modal";
import AddStartUpForm from "../forms/projects/AddStartUpForm";
import AddManagementCostForm from "../forms/projects/AddManagementCostForm";
import AddStakeholderForm from "../forms/projects/AddStakeholderForm";
import AddMaterialForm from "../forms/projects/AddMaterialForm";
import AddContractorForm from "../forms/projects/AddContractorForm";
import AddConsultantForm from "../forms/projects/AddConsultantForm";

interface Props {}

export default function ProjectDetailsPageFormModal() {
  const { isOpen, onClose, currentModal } = useProjectDetailsPageFormModal();
  const setModalTitle = (arg: string) => {
    switch (arg) {
      case "add_startup_cost":
        return "Add Startup Cost";
      case "add_management_cost":
        return "Add Management Cost";
      case "add_stakeholder":
        return "Add Stakeholder";
      case "add_material":
        return "Add Materials";
      case "add_contractor":
        return "Add Contractor to Project";
      case "add_consultant":
        return "Add Consultant";
      default:
        return "";
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      classname=" max-w-3xl"
      title={setModalTitle(currentModal)}
    >
      {
        {
          add_startup_cost: <AddStartUpForm />,
          add_management_cost: <AddManagementCostForm />,
          add_stakeholder: <AddStakeholderForm />,
          add_material: <AddMaterialForm />,
          add_contractor: <AddContractorForm />,
          add_consultant: <AddConsultantForm />,
        }[currentModal]
      }
    </Modal>
  );
}
