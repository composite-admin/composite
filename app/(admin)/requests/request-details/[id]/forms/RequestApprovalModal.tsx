"use client";
import z from "zod";
import Material from "./Material";
import Labour from "./Labour";
import CashAdvance from "./CashAdvance";
import CashAdvanceOffice from "./CashAdvanceOffice";
import ToolsAndMachineBuy from "./ToolsAndMachineBuy";
import ToolsAndMachineRent from "./ToolsAndMachineRent";
import ToolAndMachineStore from "./ToolAndMachineStore";
import { useUpdateRequestStore } from "@/store/requests/RequestStore";
import { Modal } from "@/components/shared/Modal";
import EditRequestForm from "./edit/EditRequestForm";
import DeleteRequest from "./DeleteRequest";

export default function RequestApprovalModal() {
  const { isOpen, onClose, formType, isEdit, isDelete } =
    useUpdateRequestStore();
  const { formDetails } = useUpdateRequestStore();

  if (isEdit) {
    return (
      <Modal
        title={`Edit Request - ${formDetails?.request_type}`}
        isOpen={isOpen}
        onClose={onClose}
        classname="max-w-3xl"
      >
        <EditRequestForm />
      </Modal>
    );
  }

  if (isDelete) {
    return (
      <Modal
        title={`Delete Request - ${formDetails?.request_type}`}
        isOpen={isOpen}
        onClose={onClose}
        classname="max-w-3xl"
      >
        <DeleteRequest />
      </Modal>
    );
  }

  return (
    <Modal
      title={`Approve Request - ${formDetails?.request_type}`}
      isOpen={isOpen}
      onClose={onClose}
      classname="max-w-3xl"
    >
      {formType === "Material" && <Material />}
      {formType === "Labour" && <Labour />}
      {formType === "Cash Advance Project" && <CashAdvance />}
      {formType === "Cash Advance Office" && <CashAdvanceOffice />}
      {formType === "Tools and Machine Buy" && <ToolsAndMachineBuy />}
      {formType === "Tools and Machine Rent" && <ToolsAndMachineRent />}
      {formType === "Tools and Machine Store" && <ToolAndMachineStore />}
    </Modal>
  );
}


