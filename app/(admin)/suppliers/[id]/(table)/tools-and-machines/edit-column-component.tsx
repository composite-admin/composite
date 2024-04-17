import { useModal } from "@/utils/modalContext";
import { HiPencilAlt } from "react-icons/hi";
import EditToolsModal from "../../(modal)/tools/edit-tools";
import { Row } from "@tanstack/react-table";
import { IToolAndMachineryData } from "@/utils/types";

type Props = { row: Row<IToolAndMachineryData> };

const EditColumn: React.FC<Props> = ({ row }) => {
  const { showModal } = useModal();

  const showEditToolModal = () => showModal(<EditToolsModal row={row} />);

  return (
    <div className="" onClick={showEditToolModal}>
      <span className="font-semibold cursor-pointer hover:underline text-primaryLight-500 flex items-center">
        <HiPencilAlt className="text-xl" /> <span>Edit</span>
      </span>
    </div>
  );
};

export default EditColumn;
