import FramerModal from "@/components/shared/FramerModal";
import { useModal } from "@/utils/modalContext";

const MaterialModal = () => {
  const { hideModal } = useModal();

  return (
    <FramerModal isOpen={true} isAutomatic={false} onClose={hideModal}>
      <div className="min-w-[40rem] bg-white rounded-lg p-20"></div>
    </FramerModal>
  );
};

export default MaterialModal;
