import { useClientStoreModal } from "@/store/client/useClientStore";
import AddImages from "./AddImages";
import AddCommentForm from "./AddCommentForm";
import { Modal } from "@/components/shared/Modal";

export default function ClientModal() {
  const { isOpen, modalType, onClose } = useClientStoreModal();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      classname="max-w-3xl min-h-[50vh] overflow-y-auto"
      title={modalType === "add comment" ? "New Comment" : "Add Images"}
    >
      {modalType === "add comment" ? (
        <AddCommentForm />
      ) : modalType === "add images" ? (
        <AddImages />
      ) : null}
    </Modal>
  );
}
