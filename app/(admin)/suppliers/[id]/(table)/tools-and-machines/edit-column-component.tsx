import { useModal } from "@/utils/modalContext";
import { HiPencilAlt } from "react-icons/hi";
// import EditToolsModal from "../../(modal)/tools/edit-tools";

const EditColumn = () => {
  const { showModal } = useModal();

  // const showEditToolModal = () => showModal(<EditToolsModal />);

  return (
    <div className="">
      <span className="font-semibold cursor-pointer hover:underline text-primaryLight-500 flex items-center">
        <HiPencilAlt className="text-xl" /> <span>Edit</span>
      </span>
    </div>
  );
};

export default EditColumn;
