import { Modal } from "@/components/shared/Modal";
import { useAddCommentModal } from "@/store/modals/useCreateModal";
import AddCommentForm from "./AddCommentForm";

export default function AddCommentModal() {
  const isOpen = useAddCommentModal((state) => state.isOpen);
  const onClose = useAddCommentModal((state) => state.onClose);

  return (
    <Modal
      title="Add Comment"
      isOpen={isOpen}
      onClose={onClose}
      classname="max-w-md"
    >
      <AddCommentForm />
    </Modal>
  );
}
