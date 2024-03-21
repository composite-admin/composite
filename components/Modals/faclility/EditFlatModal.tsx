import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAddCommentModal } from "@/store/modals/useCreateModal";

export default function EditFlatModal() {
  const isOpen = useAddCommentModal((state) => state.isOpen);
  const onClose = useAddCommentModal((state) => state.onClose);

  return (
    <Modal
      title="Add Comment"
      isOpen={isOpen}
      onClose={onClose}
      classname="max-w-md"
    >
      <form className="space-y-5">
        <div className="space-y-1">
          <h2 className="capitalize font-semibold text-lg">
            Edit Flat
          </h2>
          <p className="text-textColor">
            Make changes to this flat
          </p>
        </div>
        <div>
          <Textarea className="h-[11rem]" placeholder="Enter comment here" />
        </div>
        <div className="w-full">
          <Button className="w-full">Done</Button>
        </div>
      </form>
    </Modal>
  );
}
