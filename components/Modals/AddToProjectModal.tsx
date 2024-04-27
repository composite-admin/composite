import {
  useAddToProjectModal,
  useSuccessModal,
} from "@/store/modals/useCreateModal";
import ManageStaffModalIcon from "../icons/ManageStaffModalIcon";
import { Modal } from "../shared/Modal";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import useConsultantStore from "@/store/consultants/useConsultantStore";
import AddConsultantToProjectForm from "../forms/AddConsultantToProjectForm";

export default function AddToProjectModal() {
  const { isOpen, onClose } = useAddToProjectModal();
  const { consultantDetailsData } = useConsultantStore();
  const router = useRouter();
  return (
    <Modal isOpen={isOpen} onClose={onClose} classname="max-w-md">
      <AddConsultantToProjectForm id={consultantDetailsData?.data?.id} />
    </Modal>
  );
}
