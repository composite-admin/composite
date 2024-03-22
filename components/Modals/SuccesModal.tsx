import { useSuccessModal } from "@/store/modals/useCreateModal";
import ManageStaffModalIcon from "../icons/ManageStaffModalIcon";
import { Modal } from "../shared/Modal";
import { Button } from "../ui/button";

export default function SuccesModal() {
    const {isOpen, onClose} = useSuccessModal()
  return (
    <Modal
      title="Successful"
      isOpen={isOpen}
      onClose={onClose}
      classname="max-w-md"
    >
      <div className='space-y-7'>
        <div className='flex flex-col items-center'>
          <ManageStaffModalIcon />
        </div>
        <div className='text-center'>
          <h2>Changes made successfully</h2>
          <p>
            The you have successfully edit the inventory and the new information
            has be effected
          </p>
        </div>
        <div>
          <Button className='w-full'>Done</Button>
        </div>
      </div>
    </Modal>
  );
}
