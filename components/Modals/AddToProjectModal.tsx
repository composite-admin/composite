import { useAddToProjectModal } from "@/store/modals/useCreateModal";
import { Modal } from "../shared/Modal";
import { useRouter } from "next/navigation";
import useConsultantStore from "@/store/consultants/useConsultantStore";
import AddConsultantToProjectForm from "../forms/AddConsultantToProjectForm";
import useManageClientStore from "@/store/manage-client/useManageClientStore";
import AddClientToProject from "../forms/AddClientToProject";

export default function AddToProjectModal() {
  const { isOpen, onClose, addToProjectFormType } = useAddToProjectModal();
  const { clientDetailsData } = useManageClientStore();

  const { consultantDetailsData } = useConsultantStore();
  const router = useRouter();
  return (
    <Modal isOpen={isOpen} onClose={onClose} classname="max-w-md">
      {/* <AddConsultantToProjectForm id={consultantDetailsData?.data?.id} /> */}

      {addToProjectFormType === "consultant" ? (
        <AddConsultantToProjectForm id={consultantDetailsData?.data?.id} />
      ) : addToProjectFormType === "client" ? (
        <AddClientToProject id={clientDetailsData?.client_id} />
      ) : null}
    </Modal>
  );
}
