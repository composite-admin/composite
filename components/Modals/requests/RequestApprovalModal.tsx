import Labour from "@/app/(admin)/requests/request-details/[id]/forms/Labour";
import ToolsAndMachineBuy from "@/app/(admin)/requests/request-details/[id]/forms/ToolsAndMachineBuy";
import { Modal } from "@/components/shared/Modal";
import { useUpdateRequestStore } from "@/store/requests/RequestStore";

export default function RequestApprovalModal() {
  const { isOpen, onClose, formType } = useUpdateRequestStore();

  return (
    <Modal
      title="Add Comment"
      isOpen={isOpen}
      onClose={onClose}
      classname="max-w-5xl"
    >
      <ToolsAndMachineBuy />
    </Modal>
  );
}
